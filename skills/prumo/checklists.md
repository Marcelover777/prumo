# Checklists

Use a cada rodada de crítica (etapa 7) e antes de entregar (etapa 8). Cada item é verificável. Item reprovado
volta para a construção antes de qualquer coisa nova entrar. Números marcados "estimativa" são faixas de
trabalho tiradas das fontes citadas, não norma.

## Triagem dos achados

- **Bloqueador:** quebra o trabalho da tela, a acessibilidade básica ou uma regra da marca.
- **Alto:** o dono notaria na primeira olhada; contraste, hierarquia ou estado errado.
- **Médio:** inconsistência visível que não impede o uso.
- **Detalhe:** polimento.
- Até 5 achados por rodada. Corrija bloqueadores e altos, recapture e mostre antes/depois. Depois de 3 rodadas
  na mesma tela, volte ao dono.

## Direção

- [ ] O elemento-assinatura existe, é um só e vem do mundo do assunto.
- [ ] A proposta passou pela [lista anti-slop](referencias/anti-slop.md) e pelo teste do prompt parecido.
- [ ] O que o dono já escolheu foi preservado, ou a troca foi justificada.

## Polimento visual

- [ ] Tudo alinhado a uma referência (grade, linha de base ou centro óptico); ícones com ajuste óptico de ±1 px.
- [ ] Escala curta de raios, concêntrica: raio do filho = raio do pai − padding, nunca maior.
- [ ] Sombras em duas camadas ou mais, tingidas pelo fundo; bordas semitransparentes onde há sobreposição.
- [ ] Um único conjunto de ícones, com traço e tamanho coerentes com o texto.
- [ ] Nenhum estilo órfão: toda cor, espaço e raio sai de token.
- [ ] Hover, pressionado e foco com mais contraste que o repouso.
- [ ] Imagens no tamanho de uso, sem artefato de IA nem texto ilegível; proporção correta.
- [ ] Favicon, `theme-color` e `color-scheme` coerentes com o tema.

## Tipografia

- [ ] Uma ou duas famílias com papel claro (terceira, mono, só para dado técnico); display usado com restrição.
- [ ] Escala definida (razão 1,2–1,25 na interface, 1,333–1,5 em marca e landing; estimativa), fluida com
  `clamp()` quando fizer sentido. Nada de dezenas de tamanhos soltos.
- [ ] Texto corrido com 45–75 caracteres por linha (o WCAG 1.4.8, AAA, pede até 80).
- [ ] Entrelinha de ~1,4–1,6 no texto e ~1,0–1,2 no display (estimativa).
- [ ] `text-wrap: balance` em títulos e `text-wrap: pretty` em parágrafos.
- [ ] Algarismos tabulares em preço, tabela e indicador; aspas curvas, "…", espaço inquebrável entre número
  e unidade; sem viúvas.
- [ ] Corpo com 16 px no site (14–15 px em ferramenta densa); input com 16 px ou mais no celular; **nada abaixo de
  11 px**, nem em rótulo, selo ou contador. Confira as exceções espalhadas (`text-[10px]` em componentes), não só
  a regra base.
- [ ] Fontes em WOFF2 com subconjunto, preload das críticas e fallback definido.

## Cor e contraste

- [ ] Paleta com papéis (fundos, componentes, bordas, sólido, texto), de preferência em OKLCH.
- [ ] WCAG 2.2 AA em cada tema adotado: 4,5:1 no texto; 3:1 no texto grande (24 px, ou 18,66 px em negrito); 3:1
  em componentes, ícones, bordas de controle e gráficos. `scripts/contraste.mjs` sai 0.
- [ ] Estado nunca só por cor: há texto, ícone ou forma junto.
- [ ] Uma cor codifica uma variável só (não estado e intensidade ao mesmo tempo).
- [ ] Só os temas escolhidos na entrevista; se houver os dois, o escuro é paleta própria, não inversão.
- [ ] Gráficos seguros para daltonismo.

## Layout e hierarquia

- [ ] Uma decisão principal por tela; o resto em segundo plano ou recolhido.
- [ ] Espaço em base 4 (4/8/12/16/24/32/48/64/96).
- [ ] Sem rolagem infinita de blocos: detalhe vai para gaveta, aba ou página própria.
- [ ] Card dentro de card não existe; borda só quando separa algo.

## Estados e conteúdo

- [ ] Carregando com esqueleto na forma final (sem deslocar o layout); botão em carregamento mantém o rótulo.
- [ ] Tempos: até 0,1 s parece instantâneo; acima de 1 s mostre que está ocupado; acima de 10 s, progresso e
  cancelar (Nielsen Norman Group).
- [ ] Vazio que diz o que fazer; erro com causa e saída, sem desculpa.
- [ ] Conteúdo curto, médio e muito longo testado (nomes longos, lista vazia, número enorme).
- [ ] Copy em voz ativa, nomes que a pessoa reconhece, sem jargão interno nem número sem fonte.

## Movimento

- [ ] Cada animação explica uma mudança ou responde a uma ação; nada em ação frequente ou de teclado.
- [ ] Durações por token: micro 70–150 ms, expansão 200–300 ms, grande 400–500 ms, escurecer o fundo até 700 ms
  (estimativa a partir da IBM Carbon).
- [ ] Curva de saída (`ease-out`) para o que entra; saída mais curta que a entrada; sem bounce em interface de
  trabalho.
- [ ] Só `transform` e `opacity`; nunca `transition: all`; interrompível; parte da origem espacial.
- [ ] `prefers-reduced-motion` com alternativa (opacidade, ou nada), inclusive rolagem suave, JS e WebGL.
- [ ] Autoplay com mais de 5 s tem pausa; WebGL pausa fora da tela.

## Acessibilidade (WCAG 2.2 AA)

- [ ] Tudo operável por teclado; ordem lógica; foco visível com 3:1.
- [ ] Foco nunca encoberto por cabeçalho fixo, rodapé ou gaveta (2.4.11).
- [ ] Alvo de pelo menos 24×24 px (2.5.8); 44 px no toque.
- [ ] Arrastar sempre com alternativa de clique (2.5.7).
- [ ] Rótulo em todo controle e ícone; texto alternativo; títulos em hierarquia; toasts e validação em
  `aria-live`.
- [ ] Erro ao lado do campo, com foco no primeiro erro ao enviar.
- [ ] Zoom de 200% e reflow em 320 px sem perda de conteúdo.
- [ ] Diálogos e gavetas prendem o foco e saem com Esc.
- [ ] axe sem violações **e** passada manual de teclado. O axe pega só parte dos problemas.

## Desempenho

- [ ] Core Web Vitals no percentil 75: LCP até 2,5 s, INP até 200 ms, CLS até 0,1.
- [ ] Imagens AVIF/WebP no tamanho de uso, com dimensões declaradas; `loading="lazy"` abaixo da dobra.
- [ ] Bibliotecas pesadas (Three.js, GSAP, gráficos) só na tela que usa; código dividido por rota.

## Responsividade

- [ ] 390, 768 e 1440 px sem rolagem horizontal (e 1024 na entrega).
- [ ] Container queries nos componentes; safe-area; hover só em `@media (hover: hover)`.
- [ ] `100svh`/`dvh` conferido no celular.

## Interface densa de dados

- [ ] Números à direita, tabulares, com unidade no cabeçalho e casas decimais consistentes.
- [ ] Linhas de 32–40 px no modo denso; cabeçalho fixo; truncar com o valor completo acessível; nada de card em
  volta da tabela.
- [ ] Filtros, ordenação e aba na URL.
- [ ] Gráficos com rótulo direto, sem 3D decorativo, cor para uma variável só.

## QA e evidência

- [ ] Portões de [QA](referencias/qa.md) rodados com código de saída lido.
- [ ] Console sem erro.
- [ ] Revisor de contexto limpo sem bloqueador nem alto.
- [ ] Capturas de antes/depois guardadas junto da entrega.
