# QA e portões

Carregue nas etapas 7 e 8. Regra: **leia o código de saída antes de dizer "pronto"** e confira também o lado que
não se espera ver (o arquivo gerado, a captura, o relatório).

## Ler o código de saída

- Bash: `comando; echo "EXIT $?"`.
- PowerShell: `comando; "EXIT $LASTEXITCODE"`.
- Em pipe, o código é do último comando. Não use `| tail` num portão sem `set -o pipefail`.
- `grep` inverte a leitura: sai 0 quando **acha** (portão reprovado) e 1 quando não acha (aprovado); 2 é erro.

## Os scripts da skill

Ficam em `scripts/` dentro da pasta da skill. Rode a partir da raiz do projeto (é de lá que o Playwright é
encontrado).

### Contraste

```bash
node <pasta-da-skill>/scripts/contraste.mjs design/contraste.json; echo "EXIT $?"
```

- Parta de [modelos/contraste.json](../modelos/contraste.json): `temas` com as cores de cada tema (hex, `rgb()` ou
  `oklch()`, os mesmos valores do `tokens.css`) e `pares` como `[frente, fundo, mínimo]`. O mínimo padrão é 4,5;
  use 3 para texto grande, ícone e borda de controle.
- Inclua sempre texto sobre acento (o botão principal): é o par que mais reprova.
- Sai 0 sem falha, 2 com par reprovado, 1 se não leu o arquivo ou uma cor.

### Capturas

```bash
node <pasta-da-skill>/scripts/capturar.mjs http://localhost:5173/cadastro --saida=capturas/cadastro; echo "EXIT $?"
```

- **A URL:** suba antes o servidor de desenvolvimento do projeto (`npm run dev`, em geral) e use o endereço que
  ele mostrar. Página HTML solta também serve: `file:///C:/caminho/pagina.html`.
- Uma pasta de saída por página, para uma captura não sobrescrever a outra.
- **Temas:** `--temas=claro`, `--temas=escuro` ou `--temas=claro,escuro`, conforme o que o projeto adotou (o
  padrão captura os dois). `--tema-por` diz como o site troca: `sistema` (padrão, `prefers-color-scheme`),
  `classe` (classe `dark` no `<html>`, convenção do Tailwind e do shadcn) ou `data-tema` (`data-tema="claro"` ou
  `"escuro"`, como no `tokens.css` do kit).
- Outras opções: `--larguras=390,768,1440` (some 1024 na entrega), `--reduzido` (emula movimento reduzido; os
  arquivos ganham `-reduzido` no nome), `--altura=900`, `--esperar=500` (ms extras depois de carregar; aumente em
  página que busca dados).
- Captura tela a tela rolando a página (sem `fullPage`, que duplica o herói em página com `100svh` ou WebGL), até
  6 telas, e monta `folha.png` com todas as miniaturas.
- Acusa rolagem horizontal e erro de console (sai 2). Avisa, sem reprovar, quando a página passa de 6 telas e
  quando claro e escuro saem iguais (o `--tema-por` está errado, ou o site só tem um tema).
- Sai 0 limpo, 2 com achado, 1 se não abriu a página ou não achou o Playwright.

## Outros portões

### Cor solta

```bash
grep -rnE "#[0-9a-fA-F]{3,8}\b|rgba?\(|oklch\(" src/components; echo "EXIT $?"
grep -rnE "\b(bg|text|border|ring|fill|stroke|from|to|via)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}\b" src; echo "EXIT $?"
```

- Troque `src/components` e `src` pelas pastas do projeto (pasta inexistente faz o `grep` sair 2).
- O primeiro pega cor escrita à mão; o segundo, a paleta crua do Tailwind (`bg-blue-500`), a cor solta mais comum
  em projeto com Tailwind ou shadcn. Os dois saem 1 quando aprovam.
- Cada linha encontrada vira token (`bg-acento`, `text-texto-2`) ou justificativa. Comentário com `#123` é falso
  positivo.

### Anti-slop (Impeccable, opcional)

```bash
npx impeccable@4.8.0 detect http://localhost:5173/ --json; echo "EXIT $?"
```

- 0 sem achados, 2 com achados, 1 quando não leu o alvo. Defina `DO_NOT_TRACK=1` no ambiente.
- Rode na URL renderizada, não só na pasta do código: na página ele vê tamanho real de texto, largura de linha e
  contraste, e acha muito mais. Página que nunca para de carregar estoura os 30 s e sai 1.
- Achado de escolha consciente (ex.: uma fonte "manjada" que é da marca) se justifica por escrito, não se esconde.
- Versão fixa de propósito: a 4.8.0 foi lida por dentro (motor aberto, `detect` sem acesso à rede). Versão nova,
  leia antes.

### Acessibilidade (axe, opcional)

- `npm i -D @axe-core/playwright`; uso:
  `new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze()`, e o script
  sai com `process.exitCode = 1` se houver `violations`.
- O axe pega só parte dos problemas. Some sempre a passada de teclado (Tab, Shift+Tab, Esc, Enter).

### Desempenho

- Limites (web.dev, percentil 75): LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1.
- Lighthouse no DevTools do Chrome com CPU 4× e rede lenta; Lighthouse CI (`lhci autorun`) para automatizar.

### Regressão visual

- `toHaveScreenshot` do `@playwright/test`: a base nasce na primeira execução e muda com `--update-snapshots`;
  `maxDiffPixels` controla o tamanho aceito; `animations: 'disabled'` e `mask` para partes voláteis. A base vale
  só no mesmo sistema e navegador.

## Matriz de capturas

| Eixo | Valores |
|---|---|
| Largura | 390, 768, 1440 (mais 1024 na entrega) |
| Tema | os adotados no projeto: claro, escuro ou os dois |
| Estado | vazio, carregando, erro, cheio, conteúdo muito longo |
| Movimento | normal, reduzido |

## Revisor de contexto limpo

Depois dos portões automáticos, chame o subagente com o [modelo](../modelos/revisor-de-design.md). Ele recebe só
as capturas, a URL e os critérios. Achado sem evidência não conta.
