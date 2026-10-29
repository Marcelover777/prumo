---
# Esqueleto de DESIGN.md (formato proposto pelo Google Labs em 2026).
# Copie para a raiz do projeto. Os valores vêm dos tokens: ao mudar um token, atualize aqui no mesmo commit.
name: "[Nome do sistema]"
version: "[aaaa-mm-dd]"
colors:
  fundo: "[oklch(...)]"
  superficie: "[oklch(...)]"
  texto-1: "[oklch(...)]"
  texto-2: "[oklch(...)]"
  texto-3: "[oklch(...)]"
  borda: "[oklch(...)]"
  acento: "[oklch(...)]"
  sucesso: "[oklch(...)]"
  perigo: "[oklch(...)]"
  aviso: "[oklch(...)]"
  informacao: "[oklch(...)]"
typography:
  display: { family: "[família]", weight: "[peso]", role: "títulos, com restrição" }
  texto: { family: "[família]", weight: "[peso]", role: "corpo e interface" }
  # dado: { family: "[mono]", role: "dado técnico" }  # só se houver código/SKU de verdade
  escala: "[razão e passos]"
spacing: { base: "4px", passos: "4 8 12 16 24 32 48 64 96" }
radius: { sm: "[px]", md: "[px]", lg: "[px]", regra: "concêntrico" }
---

# [Nome do sistema]

Fonte dos tokens: `[caminho]`. Para mudar algo, edite os tokens e atualize este arquivo junto.

## Overview

- Assunto e o mundo dele: [uma frase].
- Público e único trabalho: [uma frase].
- Elemento-assinatura: [qual e por quê].
- Risco assumido e principal objeção: [uma frase].

## Colors

- Papel de cada cor e proporção de uso: [ex.: 70 base · 20 superfície · 7 acento · 3 estados].
- Temas adotados: [só claro | só escuro | os dois, seguindo o sistema, com seletor?] e por quê.
- Contraste conferido com `scripts/contraste.mjs` em cada tema (texto 4,5:1; texto grande, componentes e
  gráficos 3:1).
- Uma cor codifica uma variável; estado nunca só por cor.

## Typography

- Família por papel e por quê.
- Escala e onde cada passo aparece; nada abaixo de 11 px.
- Algarismos tabulares em preço, tabela e indicador.
- `text-wrap: balance` em títulos; `pretty` em parágrafos.

## Layout

- Grade, larguras máximas, base de espaço.
- Pontos de quebra: 390, 768, 1024, 1440.
- Uma decisão principal por tela.

## Elevation & Depth

- Sombras em camadas, tingidas pelo fundo, por tema.
- Onde há profundidade e o que ela informa.

## Shapes

- Escala de raios e regra concêntrica.
- Bordas: espessura e quando separam algo.

## Components

- Base: [shadcn/Radix/Base UI ou outra] tematizada.
- Peças-assinatura: [lista].
- Estados obrigatórios: repouso, hover, pressionado, foco, desabilitado, carregando, erro, vazio.

## Motion

- Durações e curvas por token; mola para gesto.
- Um momento orquestrado: [qual].
- Movimento reduzido: [alternativa].

## Do's and Don'ts

- Faça: [3 a 5 itens do próprio sistema].
- Não faça: [3 a 5 itens, incluindo os sinais da lista anti-slop que mais tentam este sistema].
