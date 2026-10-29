---
name: prumo
description: "Método de design de alto nível para projetos com o Claude Code: entrevista, tendências, direção, logo e identidade, design system com tokens, telas, captura e crítica com o navegador, polimento e QA com código de saída. Use para criar o design de um projeto do zero, montar ou revisar o design system, criar logo, redesenhar ou elevar a qualidade visual de site, app, painel ou componente. Ajuste de uma linha não precisa do método."
---

# Prumo

O prumo é o fio com peso que o pedreiro usa para saber se a parede está reta. Esta skill faz o mesmo com o design:
decide antes de construir e confere antes de dizer "pronto". O núcleo cabe em quatro frases:

1. **Direção antes de código**, com um risco só.
2. **Tokens como fonte única:** nenhuma cor, espaço ou fonte solta no componente.
3. **Opções baratas, decisão humana:** o agente propõe e recomenda; o dono escolhe.
4. **Loop fechado com evidência:** capturar, criticar, corrigir e só dizer "pronto" com o código de saída lido.

## Quando usar

- **Projeto do zero** ("cria o design do meu projeto", "quero uma marca/logo", "monta o design system"): siga a
  jornada completa, etapa 0 em diante.
- **Projeto que já existe** ("deixa mais bonito", "redesenha essa tela"): leia o que existe (tokens, componentes,
  DESIGN.md), comece pela etapa 2 ou 5 e preserve o que o dono já escolheu.
- **Ajuste pequeno** (trocar texto, um espaço, uma cor por token): faça direto e confira com uma captura.
- **Com outra skill de design instalada:** em conflito, vale o brief do dono, depois os tokens do projeto, depois
  esta skill.

## Tema claro, escuro ou os dois

O tema é escolha do dono, feita na etapa 0. Nenhum é o padrão. Se ele não tiver preferência, recomende pelo uso:

- **Só claro:** leitura longa de dia, público amplo, site institucional, loja. É o mais simples de manter.
- **Só escuro:** ferramenta de uso noturno ou contínuo, mídia, quando o conteúdo é imagem ou vídeo.
- **Os dois:** app de uso diário em horários variados. Siga o sistema (`prefers-color-scheme`) e, se fizer
  sentido, ofereça um seletor. Custa o dobro de conferência.

Daí em diante, "cada tema" quer dizer só os temas escolhidos: tokens, contraste e capturas cobrem esses e mais
nenhum. Tema escuro, quando existe, é paleta própria, não inversão do claro.

## A jornada

Cada etapa só começa quando o portão da anterior passa. Prompts prontos em [prompts](referencias/prompts.md).

| # | Etapa | Saída | Portão |
|---|---|---|---|
| 0 | Entrevista | Brief de 7 linhas: assunto e o mundo dele, público, o único trabalho, restrições, gostos e recusas, temas (claro, escuro ou os dois), fora do escopo | Trabalho único, sinal de sucesso e temas escritos |
| 1 | Referências e tendências | 8–12 referências com o princípio extraído; tendências do ano classificadas em seguir, adaptar e evitar ([tendências](referencias/tendencias.md)) | Cada referência justifica um princípio; nenhuma "faça igual" |
| 2 | Direção | 2–3 territórios (tese, paleta, fontes, layout em ASCII, elemento-assinatura, movimento, risco) na [prancha](modelos/prancha-decisao.html) + recomendação | Dono escolhe um território |
| 3 | Identidade e logo | Voz em 3 adjetivos com o contrário de cada um; logo do esboço ao vetor ([identidade e logo](referencias/identidade-e-logo.md)) | Logo legível a 16 px, em uma cor e em cada tema |
| 4 | Design system | [tokens.css](modelos/tokens.css), escala de tipo, componentes-base com todos os estados, página-vitrine e [DESIGN.md](modelos/DESIGN.md) ([design system](referencias/design-system.md)) | `scripts/contraste.mjs` sai 0; vitrine capturada em cada tema |
| 5 | Telas | Conteúdo real; uma decisão principal por tela; 3–4 variações na prancha quando houver dúvida | Dono escolhe a variação |
| 6 | Movimento | O que anima e por quê, em tokens; um momento orquestrado ([movimento](referencias/movimento.md)) | Nada em ação frequente ou de teclado; versão reduzida |
| 7 | Captura e crítica | `scripts/capturar.mjs` em 390/768/1440 × cada tema; até 5 achados por rodada | Zero bloqueador e zero alto, ou 3 rodadas e volta ao dono |
| 8 | Polimento e QA | Passe de detalhes invisíveis, "tirar um acessório" e os portões de [QA](referencias/qa.md) | Todos os comandos com código de saída lido |
| 9 | Entrega | DESIGN.md e tokens em dia, capturas de antes/depois, como continuar | Outra sessão retoma sem perguntar |

Quem já tem marca pula a etapa 3; quem já tem design system começa a 4 auditando o que existe.

## Regras de ofício

- **Aterrar:** as escolhas vêm do mundo do assunto (materiais, instrumentos, vocabulário, objetos). Um app de
  oficina e um de confeitaria não podem sair parecidos.
- **Ousadia num lugar só:** um elemento-assinatura; o resto quieto. Se dois disputam atenção, um sai.
- **Anti-slop:** confira a [lista datada](referencias/anti-slop.md) nas etapas 2, 7 e 8. Um default não é
  proibido; o problema é não ter escolhido.
- **Opções:** para decidir, varie uma dimensão por vez (densidade, agrupamento, hierarquia ou tipo). Para
  explorar, varie o território inteiro. Sempre com recomendação e a principal objeção.
- **Copy é design:** verbo ativo, nome do que a pessoa controla, a mesma palavra no botão e na confirmação, vazio
  que diz o que fazer, erro com causa e saída, zero número sem fonte.
- **Expressivo na marca, produtivo no produto:** saltos de escala e pesos extremos em capa e landing; contenção em
  ferramenta de trabalho ([tipografia e cor](referencias/tipografia-e-cor.md)).
- **Bibliotecas como piso:** componentes acessíveis prontos + os tokens do projeto. Efeito de galeria só como
  assinatura, um por tela, reescrito com os tokens ([efeitos e 3D](referencias/efeitos-e-3d.md)).

## Renderizar e olhar

É o passo que separa o bom do excelente: o agente precisa **ver** o que fez.

- `node <pasta-da-skill>/scripts/capturar.mjs <url> --temas=<os escolhidos>` gera a matriz de capturas e a folha
  de contato, acusa rolagem horizontal e erro de console. `<pasta-da-skill>` é a pasta deste SKILL.md; rode a
  partir da raiz do projeto, que precisa do Playwright (`npm i -D playwright` e `npx playwright install chromium`).
- Abra a folha de contato e as capturas com a ferramenta de leitura de imagem antes de criticar.
- Matriz mínima: 390, 768 e 1440 px; cada tema; vazio, carregando, erro e cheio; movimento reduzido. Rolagem
  horizontal em 390 px é defeito.
- Antes de declarar pronto, chame o [revisor de contexto limpo](modelos/revisor-de-design.md) por um subagente,
  só com as capturas, a URL e os critérios. Achado sem evidência não conta.

## Portões de QA

Leia o código de saída de cada comando (`; echo "EXIT $?"` no Bash, `; "EXIT $LASTEXITCODE"` no PowerShell).
Detalhes em [QA](referencias/qa.md).

| Portão | Comando | Passa quando |
|---|---|---|
| Contraste dos tokens | `node <pasta-da-skill>/scripts/contraste.mjs <pares>.json` | Sai 0 (2 = par reprovado) |
| Cor solta | os dois `grep` de [QA](referencias/qa.md) na pasta dos componentes | Saem 1 (nada encontrado) |
| Tipos e build | os scripts do projeto (`npm run build`, `tsc --noEmit`…) | Saem 0 |
| Capturas e console | `node <pasta-da-skill>/scripts/capturar.mjs <url>` | Sai 0 |
| Teclado | Tab, Shift+Tab, Enter e Esc pela tela inteira | Tudo alcançável, foco sempre visível |
| Acessibilidade (opcional) | axe, se `@axe-core/playwright` estiver instalado | Zero violação |
| Anti-slop (opcional) | o detector de [QA](referencias/qa.md), se o dono quiser | Sai 0, ou cada achado justificado |

## Limites

- **Não instale** pacote, plugin ou skill de terceiro sem o dono pedir. Antes de instalar, leia o código e as
  dependências. O Playwright no projeto já faz parte do kit.
- **Não publique** nada (site, post, repositório) sem pedido.
- **Imagem gerada por IA** é ilustração: sem logo de terceiros, sem pessoa ou depoimento inventado, sem texto
  ilegível. Orce os créditos antes de gerar. Logo final é vetor desenhado; IA serve para explorar.

## Mapa de referências

Carregue só o que a etapa pede.

| Arquivo | Quando abrir |
|---|---|
| [prompts](referencias/prompts.md) | Qualquer etapa: modelos prontos para colar |
| [tendências](referencias/tendencias.md) | Etapa 1: pesquisar e classificar tendências |
| [identidade e logo](referencias/identidade-e-logo.md) | Etapa 3: voz, símbolo, logotipo, testes |
| [design system](referencias/design-system.md) | Etapa 4: tokens, temas, componentes, vitrine |
| [tipografia e cor](referencias/tipografia-e-cor.md) | Etapas 2–4: escala, tamanhos, OKLCH, contraste |
| [movimento](referencias/movimento.md) | Etapa 6: durações, curvas, molas, coreografia |
| [efeitos e 3D](referencias/efeitos-e-3d.md) | Etapas 4–6, quando houver efeito de galeria, 3D, globo ou mapa |
| [anti-slop](referencias/anti-slop.md) | Etapas 2, 7 e 8 |
| [checklists](checklists.md) | Etapas 7–8: a cada rodada de crítica e antes de entregar |
| [QA](referencias/qa.md) | Etapas 7–8: comandos, scripts, matriz de capturas |
| [tokens.css](modelos/tokens.css) e [contraste.json](modelos/contraste.json) | Etapa 4: tokens em três camadas e os pares que os conferem |
| [DESIGN.md](modelos/DESIGN.md) | Etapa 4: o documento do design system |
| [revisor](modelos/revisor-de-design.md) | Etapa 7 e antes da entrega |
| [prancha](modelos/prancha-decisao.html) | Etapas 2, 3 e 5: decisão entre opções |
