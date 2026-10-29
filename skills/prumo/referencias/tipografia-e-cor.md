# Tipografia e cor

Carregue nas etapas 2 e 3. Esta página dá o método; os valores do projeto ficam nos tokens.

## Tipografia

**Papéis.** Uma ou duas famílias; se forem duas, bem distintas:

- Display com personalidade, usada com restrição (pode ser a mesma família em outro peso ou largura).
- Texto legível para corpo e interface.
- Uma terceira, utilitária (mono), só se houver dado técnico de verdade: código, SKU, especificação.

Mono em todo rótulo pequeno virou clichê de 2026. Preço e números de tabela usam algarismos tabulares da fonte
de texto (`font-variant-numeric: tabular-nums`).

**Serifa editorial.** Voltou e já virou uniforme das marcas de IA (Monotype, 06/05/2026). Funciona melhor como voz
pontual, uma linha por peça; como base do sistema, só se o brief pedir.

**Escala.**

- Interface: razão 1,2–1,25. Marca e landing: 1,333–1,5 (estimativa).
- Fluida com `clamp()`, interpolando duas escalas (método Utopia: 1,2 em 320 px e 1,333 em 1500 px).
- Expressivo na marca (saltos de 3×, pesos extremos 100–200 contra 800–900); produtivo no produto.
- Fonte variável: o eixo de largura vira gesto de marca em capa e título; tabela não anima.

**Leitura.**

- 45–75 caracteres por linha no texto corrido (Butterick aceita até 90; WCAG 1.4.8 AAA pede até 80).
- Entrelinha ~1,4–1,6 no texto, ~1,0–1,2 no display (estimativa).
- `text-wrap: balance` em títulos; `text-wrap: pretty` em parágrafos.

**Tamanhos.** Corpo de site com 16 px (14–15 px em ferramenta densa, como painel e tabela); input com 16 px ou
mais no celular (evita o zoom do iOS). **Piso de 11 px** só para rótulo, selo, contador e cabeçalho de tabela,
nunca menos. O erro comum não é a regra base, é a exceção: o rótulo nasce com 11 px e dezenas de componentes o
encolhem para 10 px "para caber". Procure com
`grep -rnE "text-\[(9|10|10\.5)px\]|font-size:\s*(9|10|10\.5)px" src`.

**Acabamento.** Aspas curvas; reticências tipográficas; espaço inquebrável entre número e unidade; sem viúvas.

**Carregamento.** WOFF2 com subconjunto (`pyftsubset … --flavor=woff2`, do fontTools), preload das críticas,
`font-display: swap` e fallback definido. Confira a licença (a SIL OFL permite subconjunto). Fontes boas e
gratuitas: Google Fonts, Fontshare, as da coleção OFL.

## Cor

**OKLCH** (artigo da Evil Martians, 09/2025):

- Luminosidade perceptual igual entre matizes; paleta por fórmula; alcança P3.
- Cada eixo se manipula sozinho: `oklch(from var(--acento) calc(l + 0.1) c h)` para o hover.
- Cuidado: o croma máximo muda com o matiz e o navegador corta cor fora da gama. Use fallback sRGB quando
  importar e `@media (color-gamut: p3)`.
- Ferramentas: oklch.com, Huetone, culori, Color.js.

**Escala de 12 passos (Radix Colors):**

| Passos | Papel |
|---|---|
| 1–2 | Fundos |
| 3–5 | Fundo de componente: normal, hover, pressionado |
| 6–8 | Bordas: sutil, interativa, foco |
| 9–10 | Sólido puro e o hover dele |
| 11–12 | Texto de baixo e de alto contraste |

**Três camadas de tokens:** primitivos (as escalas), semânticos (fundo, superfície, texto-1 a 3, borda, acento,
sucesso, perigo, aviso, informação) e de componente só quando necessário. Movimento também é token. O Tailwind v4
lê os tokens por `@theme`; o formato portátil é o W3C Design Tokens (DTCG).

**Paleta.**

- Uma cor dominante + um acento com **papel definido** (só no que é ação, ou só no que é resposta) vence uma
  paleta tímida e uniforme. Não confunda com o clichê "quase-preto + um neon": lá o acento é enfeite espalhado e
  a cor não vem do assunto.
- Neutros levemente tingidos pelo matiz da marca, por decisão.
- Com os dois temas, o escuro é outra paleta, não inversão (menos croma, acento mais claro).
- Estado nunca só por cor. Uma cor codifica uma variável só.
- Gráficos seguros para daltonismo; verde/vermelho só para direção.

## Contraste

- **Portão:** WCAG 2.2 AA.
  - Texto: 4,5:1.
  - Texto grande (24 px, ou 18,66 px em negrito): 3:1.
  - Componentes, ícones, bordas de controle, foco e gráficos: 3:1.
- **Segunda leitura:** APCA, alvo ~Lc 75 no corpo (estimativa). O algoritmo do WCAG 3 ainda está em rascunho:
  não use APCA como portão.
- `scripts/contraste.mjs` confere os pares e sai 2 se algum reprovar.

## Grade, espaço e forma

- Base de 4 px: 4/8/12/16/24/32/48/64/96.
- Raios curtos e concêntricos (ex.: 4/6/10/16). Raio exagerado igual em tudo achata a hierarquia.
- Sombras em camadas; bordas semitransparentes.
- Layout por flex, grid e tamanho intrínseco; container queries nos componentes; safe-area.
