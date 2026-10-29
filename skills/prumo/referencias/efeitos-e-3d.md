# Efeitos, 3D e componentes de galeria

Carregue nas etapas 4–6, quando houver efeito de galeria, 3D, globo, mapa ou fundo animado. Catálogos e licenças
mudam todo mês: confira versão e licença antes de instalar (situação lida em 10/2026).

## Três regras

1. **3D e efeito explicam um dado ou respondem a uma ação.** Se não fazem nenhum dos dois, são enfeite: corte.
   Antes de começar, escreva em uma linha o que o efeito explica e o que a versão plana mostra.
2. **Uma assinatura por tela**, o resto quieto. Todo efeito entra com os tokens do projeto, versão plana e versão
   com movimento reduzido.
3. **Nada entra sem ver o código antes.** Leia o arquivo e as dependências do item; depois de instalar, confira o
   diff do `package.json` (versão rebaixada ou alfa é sinal de parar).

## Onde buscar

| Necessidade | Primeira escolha | Alternativa | Evitar |
|---|---|---|---|
| Componente animado em produto | Motion + Motion Primitives (MIT) | Magic UI (MIT) para número e borda; Animate UI | Segunda biblioteca de animação no mesmo app |
| Lista que entra, sai e reordena | AutoAnimate | `layout` do Motion | `transition: all` |
| Troca de tela | View Transitions | `AnimatePresence` do Motion | — |
| 3D de produto ou dado | three.js + React Three Fiber + drei | `<model-viewer>` para página isolada | Spline runtime em ferramenta de trabalho |
| Globo ou mapa | cobe (~5 KB) | three-globe; MapLibre + deck.gl para mapa real | Globo em canvas próprio pesado |
| Fundo animado (shader) | Paper Shaders (Apache-2.0) | Fundos do React Bits | Shadertoy (CC BY-NC-SA), Vanta (abandonado) |

**Galerias com registry shadcn** (`npx shadcn@latest add <url-do-item>`):

| Galeria | Licença | Atenção |
|---|---|---|
| Magic UI | MIT | Bom para KPI, número que conta, bordas |
| Motion Primitives | MIT | Sóbrio; ótimo para produto |
| Aceternity UI | Sem licença pública verificada | Itens pesados e "vitrine"; confira antes |
| React Bits | MIT + Commons Clause (usa, não revende) | Cada fundo cria um contexto WebGL |
| Animate UI | MIT + Commons Clause | Primitivas Radix animadas |
| coss (ex-Origin UI) | AGPL-3.0 | Evite em projeto fechado |

**Sem registry:** 21st.dev (código só logado, licença por componente), Uiverse (MIT, CSS puro), CodePen (pens
públicos são MIT: mantenha o aviso), Codrops (licença por demo). Prefira refazer a ideia com os seus tokens a
colar o código.

## Trazer um componente de galeria

1. Ache 2–5 candidatos com URL e licença.
2. Leia o código e as dependências do item.
3. Instale numa branch (ou com cópia do `package.json` e do lock), confira o diff.
4. Troque toda cor fixa por token e o tema pelo mecanismo do projeto; anote na 1ª linha a origem e o que mudou.
5. Ligue a versão de movimento reduzido e capture em cada tema adotado.

## Se for usar 3D

- **Versão plana obrigatória:** sem WebGL, com erro ou enquanto carrega, o mesmo dado em lista, barras ou SVG.
  Nunca uma área vazia. O dado crítico também fica fora do canvas, legível por leitor de tela.
- **Um WebGL por tela**, que monta quando aparece e pausa fora da vista.
- **Cores dos tokens:** WebGL e bibliotecas de gráfico não leem CSS. Leia a variável com `getComputedStyle` e
  recalcule quando o tema mudar.
- **Peso:** three + React Three Fiber + drei passam de 200 KB gzip. Carregue só na tela que usa (`lazy()` por
  rota).
- Modelo baixado só com licença de uso comercial (CC0 primeiro: Poly Haven, Kenney, Quaternius) e comprimido
  (glTF Transform); logo de fabricante no modelo só com autorização.

## Inspiração

Codrops (técnica com código), Awwwards e Godly (vitrine), Lapa Ninja (landing), Mobbin (fluxos de app; pago),
motion.dev/examples, Emil Kowalski ("Animations on the Web") e Rauno Freiberg ("Devouring Details").
