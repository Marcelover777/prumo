# Lista anti-slop

**Revisada em 29/10/2026.** Revise a cada trimestre: item novo só entra com evidência datada.

Um default não é proibido. O problema é não ter escolhido. Se o brief pedir um destes visuais, siga o brief.
Fora isso, troque pela alternativa ou justifique por escrito.

**Por que a lista é viva.** Em 2025 a regra era "não use Inter nem roxo". Em 2026, a própria Anthropic
listou clusters novos (creme com terracota, preto com acento ácido,
jornal de filetes). Proibir um default empurra o modelo para o próximo. Por isso a lista tem data e uma rotina.

## Geração 1 (2024–2025)

| Sinal | Faça em vez disso |
|---|---|
| Inter, Roboto, Arial ou fonte do sistema em tudo | Par escolhido para o assunto; display com personalidade usado pouco |
| Degradê roxo/índigo sobre branco; texto em degradê | Cor dominante tirada de algo verdadeiro do produto, com um acento afiado |
| Herói centralizado, dois botões, mockup de dashboard flutuando | Herói como tese: o objeto mais característico do assunto, com texto que só este produto diria |
| Três cards de recurso com ícone em quadrado arredondado | Ritmo assimétrico; conteúdo real que não cabe em três colunas |
| Emoji como ícone; ícones de traço genéricos | Um conjunto coerente, ou desenho próprio ligado ao assunto |
| Glassmorphism, brilho e glow sem motivo; partículas ou blobs 3D | Profundidade que informa (camada, foco) ou nenhuma |
| Raio grande e igual em tudo; sombra cinza uniforme | Escala de raios concêntrica; sombras em camadas, tingidas |
| Selo "Novo" pulsando; faixa "Confiado por" automática | Status só quando reflete estado real; prova social só se existir |
| Copy sem peso ("eleve", "desbloqueie", "sem esforço") e número inventado ("10× mais rápido") | Quem usa, o que faz, com que dado; zero número sem fonte |
| Card dentro de card; borda colorida grossa de um lado só | Hierarquia por espaço e tipo; borda só quando separa algo |

## Geração 2 (2026, citada pela própria Anthropic)

| Sinal | Faça em vez disso |
|---|---|
| Creme (~#F4F1EA) + serifa display de alto contraste + terracota (~#D97757) | Paleta e tipo do mundo do assunto; serifa como assinatura, não como sistema |
| Quase-preto + um acento verde-ácido ou vermelhão | Contraste de tom e de material, não um "neon único" |
| Broadsheet: filetes, raio zero, colunas densas de jornal | Grade a serviço do conteúdo real |
| Rótulo em caixa-alta espaçada acima de todo título | Título que se sustenta sozinho; rótulo só onde orienta |
| Metadados com ponto médio ("A · B · C"); rótulo "PALAVRA — fragmento" | Metadado no lugar e no formato em que é lido |
| Mono em todo rótulo pequeno; quase-preto #0B0B0B ou #111 por hábito | Mono só para dado técnico (código, SKU); algarismos tabulares para números |
| Seta no fim de todo link e botão | Verbo claro; seta só onde há deslocamento real |
| Numeração 01/02/03 sem sequência real | Numerar só processo ou ordem que importa |
| "Número grande + rótulo pequeno + acento em degradê" como herói | Herói como tese |
| Fade-and-slide em toda seção; hover com elevação em todo card | Um momento orquestrado; hover só onde há ação |
| Kit SaaS: cards iguais, um raio só, sombra cinza uniforme, degradê de enfeite | Componentes com papéis diferentes e escala de forma |

Fontes: skill `frontend-design` da Anthropic (versão de 2026); 925 Studios (14/06/2026); Noqta (04/06/2026).

## Marcas e identidade em 2026

- **Logo de "IA":** orbe violeta com anel, faísca de quatro pontas, linhas luminosas (Creative Bloq, LogoLounge
  2026). Diga o que o produto faz, não que "tem IA".
- **Vidro e brilho em tudo:** legibilidade ruim (Nielsen Norman Group, 10/2025). Vidro só em momento-chave;
  textura tátil leve (grão, contorno de 1 px) no lugar do brilho liso.
- **Confiança por adjetivo** ("confiável", "garantido"): troque por evidência visível (foto real, regra explicada,
  data).

Clichês de setor também contam: liste os do assunto antes de desenhar (restaurante = lousa e madeira; fintech =
azul e gráfico subindo; academia = preto, neon e itálico) e fuja deles de propósito.

## Processo e acabamento

| Sinal | Faça em vez disso |
|---|---|
| Sem estados vazio, carregando e erro; foco removido | Estados desenhados; foco visível |
| Dezenas de tamanhos de fonte | Escala com papéis |
| Texto funcional abaixo de 11 px "para caber" | Piso de 11 px; corte conteúdo ou mude o layout |
| Bounce ou elástico em interface de trabalho | Curva de saída ou mola amortecida |
| Imagem de IA com texto ilegível, logo de terceiros ou pessoa inventada | Cena ilustrativa rotulada; foto real do produto |
| Efeito de galeria colado no lugar de direção | Um efeito por tela, reescrito com os tokens |
| Travessão em excesso no texto (alguns leitores associam a IA) | Pontuação variada, frases curtas |

## Rotina contra o próximo default

1. **Teste do prompt parecido.** Peça a mesma peça para outro cliente do mesmo setor (mesmo pedido, outro nome).
   Compare lado a lado. O que se repete nas duas é default: troque ou justifique.
2. **Auditoria visual.** Rode o prompt 16 de [prompts](prompts.md) nas capturas finais (e o detector opcional de
   [QA](qa.md), se estiver em uso).
3. **Revisão trimestral** desta lista, com data e fonte.
