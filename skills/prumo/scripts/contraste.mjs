#!/usr/bin/env node
// Confere o contraste WCAG 2.2 dos pares de tokens, tema por tema.
// Uso: node contraste.mjs <arquivo.json>
// Formato e exemplo em referencias/qa.md. Cores: #rgb, #rrggbb, rgb(), oklch() (transparência é ignorada, com aviso).
// Saída: 0 = todos os pares passam · 2 = algum par reprovado · 1 = arquivo ou cor ilegível.
import { readFileSync } from 'node:fs';

function falhar(msg) {
  console.error(`contraste: ${msg}`);
  process.exitCode = 1;
}

// sRGB 0–1 (gama) a partir de hex, rgb() ou oklch()
function paraSrgb(cor) {
  const c = String(cor).trim().toLowerCase();
  let m = c.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h.slice(0, 3)].map((x) => x + x).join('');
    if (h.length !== 6 && h.length !== 8) return null;
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  }
  m = c.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  if (m) return m.slice(1, 4).map((v) => Number(v) / 255);
  m = c.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)(?:deg)?/);
  if (m) {
    const L = Number(m[1]) / (m[2] ? 100 : 1);
    const C = Number(m[3]);
    const H = (Number(m[4]) * Math.PI) / 180;
    const a = C * Math.cos(H);
    const b = C * Math.sin(H);
    const l_ = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m_ = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s_ = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    const lin = [
      4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
      -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
      -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
    ];
    // linear → gama, com corte na gama sRGB (como o navegador faz)
    return lin.map((v) => {
      const x = Math.min(1, Math.max(0, v));
      return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
    });
  }
  return null;
}

function luminancia(rgb) {
  const [r, g, b] = rgb.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function razao(c1, c2) {
  const [a, b] = [luminancia(c1), luminancia(c2)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

function principal() {
  const arquivo = process.argv[2];
  if (!arquivo) return falhar('informe o arquivo JSON (formato em referencias/qa.md)');
  let dados;
  try {
    dados = JSON.parse(readFileSync(arquivo, 'utf8'));
  } catch (e) {
    return falhar(`não li ${arquivo}: ${e.message}`);
  }
  const temas = dados.temas || {};
  const pares = dados.pares || [];
  if (!Object.keys(temas).length || !pares.length) return falhar('o JSON precisa de "temas" e "pares"');
  let reprovados = 0;
  let ilegivel = false;
  for (const [nomeTema, cores] of Object.entries(temas)) {
    console.log(`\n${nomeTema}`);
    for (const [frente, fundo, minimo = 4.5] of pares) {
      const a = cores[frente] && paraSrgb(cores[frente]);
      const b = cores[fundo] && paraSrgb(cores[fundo]);
      if (!a || !b) {
        console.log(`  ?     ${frente} sobre ${fundo}: cor ausente ou ilegível`);
        ilegivel = true;
        continue;
      }
      const r = razao(a, b);
      const ok = r >= minimo;
      if (!ok) reprovados++;
      const alfa = [cores[frente], cores[fundo]].some((c) => /^#([0-9a-f]{4}|[0-9a-f]{8})$/i.test(c.trim()) || /rgba/i.test(c));
      console.log(`  ${ok ? 'ok   ' : 'FALHA'} ${frente} sobre ${fundo}: ${r.toFixed(2)}:1 (mínimo ${minimo}:1)${alfa ? ' · transparência ignorada: confira sobre o fundo real' : ''}`);
    }
  }
  console.log(`\n${reprovados ? `${reprovados} par(es) reprovado(s)` : ilegivel ? 'há cor ilegível' : 'todos os pares passam'}`);
  process.exitCode = ilegivel ? 1 : reprovados ? 2 : 0;
}

principal();
