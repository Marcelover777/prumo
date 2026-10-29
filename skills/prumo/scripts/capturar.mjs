#!/usr/bin/env node
// Matriz de capturas de uma página: larguras × temas, tela a tela, com folha de contato.
// Uso: node capturar.mjs <url> [--saida=capturas] [--larguras=390,768,1440] [--temas=claro,escuro]
//      [--tema-por=sistema|classe|data-tema] [--reduzido] [--altura=900] [--esperar=500]
// --temas: só os temas que o projeto adotou (claro, escuro ou os dois). --tema-por diz como o site troca de tema:
//   sistema = prefers-color-scheme (padrão) · classe = classe "dark" no <html> · data-tema = data-tema="claro|escuro".
// Rode na raiz do projeto: o Playwright é procurado no node_modules de lá.
// Saída: 0 = limpo · 2 = achado (rolagem horizontal, erro de console) · 1 = não abriu a página ou sem Playwright.
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--'));
const opcao = (nome, padrao) => {
  const a = args.find((x) => x.startsWith(`--${nome}=`));
  return a ? a.slice(nome.length + 3) : padrao;
};
const saida = path.resolve(opcao('saida', 'capturas'));
const larguras = opcao('larguras', '390,768,1440').split(',').map(Number);
const NOMES = { claro: 'light', light: 'light', escuro: 'dark', dark: 'dark' };
const temas = opcao('temas', 'claro,escuro').split(',').map((t) => NOMES[t.trim()]).filter(Boolean);
const temaPor = opcao('tema-por', 'sistema');
const altura = Number(opcao('altura', '900'));
const esperar = Number(opcao('esperar', '500'));
const reduzido = args.includes('--reduzido');

async function principal() {
  if (!url) {
    console.error('capturar: informe a URL (ex.: http://localhost:5173/)');
    return 1;
  }
  if (!temas.length || !['sistema', 'classe', 'data-tema'].includes(temaPor)) {
    console.error('capturar: use --temas=claro, escuro ou claro,escuro e --tema-por=sistema, classe ou data-tema');
    return 1;
  }
  let chromium;
  try {
    ({ chromium } = createRequire(path.join(process.cwd(), 'package.json'))('playwright'));
  } catch {
    console.error('capturar: Playwright não encontrado aqui. Rode: npm i -D playwright && npx playwright install chromium');
    return 1;
  }
  mkdirSync(saida, { recursive: true });
  const browser = await chromium.launch();
  const achados = [];
  const avisos = [];
  const arquivos = [];
  const primeiraTela = {};
  const sufixo = reduzido ? '-reduzido' : '';
  try {
    for (const largura of larguras) {
      for (const tema of temas) {
        const nomeTema = tema === 'dark' ? 'escuro' : 'claro';
        const page = await browser.newPage({ viewport: { width: largura, height: altura } });
        page.on('console', (m) => m.type() === 'error' && achados.push(`[${largura} ${nomeTema}] console: ${m.text()}`));
        page.on('pageerror', (e) => achados.push(`[${largura} ${nomeTema}] erro: ${e.message}`));
        await page.emulateMedia({ colorScheme: tema, reducedMotion: reduzido ? 'reduce' : 'no-preference' });
        try {
          await page.goto(url, { waitUntil: 'load', timeout: 30000 });
        } catch (e) {
          console.error(`capturar: não abri ${url}: ${e.message.split('\n')[0]}`);
          await browser.close();
          return 1;
        }
        if (temaPor !== 'sistema') {
          await page.evaluate(({ modo, escuro }) => {
            const html = document.documentElement;
            if (modo === 'classe') html.classList.toggle('dark', escuro);
            else html.setAttribute('data-tema', escuro ? 'escuro' : 'claro');
          }, { modo: temaPor, escuro: tema === 'dark' });
        }
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(esperar);
        const { total, larguraReal } = await page.evaluate(() => ({
          total: document.documentElement.scrollHeight,
          larguraReal: document.documentElement.scrollWidth,
        }));
        if (larguraReal > largura) achados.push(`[${largura} ${nomeTema}] rolagem horizontal: conteúdo com ${larguraReal}px`);
        // tela a tela, no máximo 6 telas por combinação
        const telas = Math.ceil(total / altura);
        if (telas > 6) avisos.push(`[${largura} ${nomeTema}] página com ${telas} telas: capturei só as 6 primeiras`);
        for (let y = 0, i = 1; y < total && i <= 6; y += altura, i++) {
          await page.evaluate((v) => window.scrollTo(0, v), y);
          await page.waitForTimeout(150);
          const nome = `${largura}-${nomeTema}${sufixo}-${i}.png`;
          const png = await page.screenshot({ path: path.join(saida, nome) });
          if (i === 1) (primeiraTela[largura] ||= {})[tema] = png;
          arquivos.push(nome);
        }
        await page.close();
      }
    }
    for (const [largura, porTema] of Object.entries(primeiraTela)) {
      const [a, b] = [porTema.light, porTema.dark];
      if (a && b && a.equals(b)) {
        avisos.push(`[${largura}] claro e escuro saíram iguais: confira --tema-por (sistema, classe ou data-tema) ou se o site tem mesmo os dois temas`);
      }
    }
    // folha de contato: miniaturas em grade, com o nome embaixo
    const cel = arquivos
      .map((f) => {
        const b64 = readFileSync(path.join(saida, f)).toString('base64');
        return `<figure><img src="data:image/png;base64,${b64}"><figcaption>${f}</figcaption></figure>`;
      })
      .join('');
    const folha = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    await folha.setContent(`<style>body{margin:0;padding:12px;background:#e9e9e6;font:12px system-ui;display:grid;
      grid-template-columns:repeat(4,1fr);gap:12px}figure{margin:0}img{width:100%;height:300px;object-fit:contain;
      object-position:top;background:#fff;border:1px solid #ccc}</style>${cel}`);
    await folha.screenshot({ path: path.join(saida, `folha${sufixo}.png`), fullPage: true });
  } finally {
    await browser.close();
  }
  console.log(`${arquivos.length} capturas + folha${sufixo}.png em ${saida}`);
  if (avisos.length) console.log(`\naviso:\n${avisos.join('\n')}`);
  if (achados.length) {
    console.log(`\n${achados.length} achado(s):\n${achados.join('\n')}`);
    return 2;
  }
  console.log('sem rolagem horizontal nem erro de console');
  return 0;
}

principal().then((codigo) => { process.exitCode = codigo; }, (e) => { console.error(e); process.exitCode = 1; });
