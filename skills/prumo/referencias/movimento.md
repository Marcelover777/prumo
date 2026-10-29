# Movimento

Carregue na etapa 6. Regra de partida: anime só o que explica uma mudança ou responde a uma ação.

## Propósito e frequência

De Emil Kowalski ("Great animations", "You don't need animations"):

- Anime mudança de estado, entrada e saída de modal, explicação de recurso. O resto fica parado.
- Quanto mais frequente a ação, menos animação. **Nunca** anime ação disparada pelo teclado.
- Na interface, normalmente menos de 300 ms. Um dropdown de 180 ms parece mais rápido que um de 400 ms.
- A animação precisa poder mudar no meio sem salto (interrompível).
- Tooltip abre com atraso; os vizinhos, depois, abrem na hora.

De Rauno Freiberg ("Invisible details of interaction design"):

- Ação leve dispara no meio do gesto; ação destrutiva só ao soltar.
- O gesto responde na hora e só depois anima.
- Consistência espacial: o objeto sai de onde veio e volta para lá.
- Interação rara pode brincar; interação frequente não.

## Tokens de duração (IBM Carbon)

| Token | Uso |
|---|---|
| 70 ms | Micro: botão, toggle |
| 110 ms | Fade |
| 150 ms | Expansão pequena |
| 240 ms | Expansão, toast |
| 400 ms | Expansão grande, notificação importante |
| 700 ms | Escurecer o fundo |

A duração cresce com a distância e com o tamanho do objeto. Marca e landing podem passar disso.

## Curvas

| Tipo | Padrão | Entrada | Saída |
|---|---|---|---|
| Produtiva (trabalho) | `cubic-bezier(0.2, 0, 0.38, 0.9)` | `(0, 0, 0.38, 0.9)` | `(0.2, 0, 1, 0.9)` |
| Expressiva (momento raro) | `(0.4, 0.14, 0.3, 1)` | `(0, 0, 0.3, 1)` | `(0.4, 0.14, 1, 1)` |

- `ease-out` para respostas e para o que entra.
- Saída mais curta que a entrada (~70–80% da entrada; estimativa).
- Sem bounce nem elástico na interface de trabalho.

## Molas (biblioteca Motion)

- Mola por duração: `visualDuration` + `bounce` (padrão 0,25). Mola por física: stiffness, damping, mass; herda a
  velocidade do gesto.
- `stagger()` faz o escalonamento.

## Coreografia

- Um momento orquestrado por página, em geral a entrada do herói.
- Escalonamento de 40–80 ms por item, teto de ~400 ms no total (estimativa); só na primeira vez (`once`).
- Objetos relacionados se movem juntos e partem da origem: o popover nasce do gatilho.
- Só `transform` e `opacity`. Nunca `transition: all`.
- Preferência de implementação: CSS, depois Web Animations API, depois JS.

## Onde usar o quê

| Camada | Ferramenta |
|---|---|
| Produto | Transição de CSS curta; Motion (`motion/react`) para estado, lista e gesto; View Transitions para lista → detalhe |
| Lista que entra, sai e reordena | AutoAnimate (`@formkit/auto-animate`) ou `layout` do Motion |
| Marca e landing | GSAP (ScrollTrigger, SplitText); animação ligada ao scroll em CSS (`animation-timeline: view()`) onde houver suporte |
| 3D | Ver [efeitos e 3D](efeitos-e-3d.md) |

Escolha **uma** biblioteca de animação por camada; duas no mesmo app é peso e incoerência.

## Movimento reduzido

- CSS: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .001ms !important;
  animation-iteration-count: 1 !important; transition-duration: .001ms !important; scroll-behavior: auto
  !important } }`.
- Essa regra **não** para animação por JS. No Motion, `<MotionConfig reducedMotion="user">` na raiz; em
  `requestAnimationFrame`, GSAP ou WebGL, leia `matchMedia('(prefers-reduced-motion: reduce)')` e pare o laço.
- Com a preferência ligada: o número aparece pronto, nada gira sozinho, entradas viram opacidade ou nada.
- Autoplay com mais de 5 s precisa de pausa (WCAG 2.2.2). O efeito nunca carrega informação sozinho.

## Vocabulário para especificar

Antes de codar, descreva: gatilho, propriedade, duração (token), curva ou mola (token), origem espacial,
escalonamento, interrupção e versão reduzida (prompt 10 de [prompts](prompts.md)). Para ajuste fino, uma página
local com sliders de duração, curva e atraso é mais rápida que descrever em texto.
