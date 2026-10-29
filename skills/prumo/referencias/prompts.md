# Prompts prontos

Para colar no Claude Code, em ordem de jornada. Troque o que está entre colchetes. As etapas são as do
[SKILL](../SKILL.md); os caminhos `scripts/` e `modelos/` são da pasta da skill prumo.

## 1. Entrevista (etapa 0)

```text
Use a skill prumo. Antes de desenhar qualquer coisa, me entreviste e monte o brief em 7 linhas:
1) assunto concreto e o mundo dele (materiais, instrumentos, vocabulário, lugares);
2) público e contexto de uso (aparelho, pressa, nível técnico);
3) o único trabalho deste projeto e o sinal de sucesso;
4) restrições: marca existente, stack, prazo, acessibilidade (WCAG 2.2 AA);
5) gostos e recusas: sites e apps que eu admiro e que eu detesto;
6) temas: só claro, só escuro ou os dois (se eu não souber, recomende pelo uso e explique);
7) fora do escopo.
Pergunte uma coisa de cada vez, só o que muda a direção; o resto, assuma e diga o que assumiu.
```

## 2. Referências (etapa 1)

```text
Pesquise 8 a 12 referências atuais para [categoria]: metade fora do nosso setor e pelo menos 3 do
mundo do assunto (objetos, embalagens, sinalização, catálogos técnicos). Para cada uma: URL, um
princípio extraído (ritmo, densidade, contraste de escala, gesto marcante) e uma coisa que NÃO vamos
copiar. Monte uma prancha HTML local com elas.
```

## 3. Tendências (etapa 1)

```text
Pesquise as tendências de design deste ano para marca, interface e movimento, com fonte e data, no
nosso setor e fora dele. Monte a tabela de referencias/tendencias.md (seguir, adaptar ou evitar, e
por quê para este projeto) e recomende no máximo uma tendência para entrar na assinatura.
```

## 4. Territórios e direção (etapa 2)

```text
Proponha 3 territórios materialmente diferentes para [projeto]. Para cada um: nome e tese ligada ao
assunto; paleta de 4 a 6 cores nomeadas (OKLCH com hex de conferência), com o papel de cada uma, em
cada tema escolhido; fontes por papel e o porquê; layout em uma frase mais wireframe ASCII; um único
elemento-assinatura; postura de movimento; o risco que assumimos e a principal objeção.
Depois rode o teste do prompt parecido (o que você faria para um pedido semelhante de outro
cliente?) e confira a lista anti-slop. Se algum território cair perto disso, revise e diga o que
mudou. Mostre os três na prancha de decisão e termine com uma recomendação.
```

## 5. Plataforma e voz (etapa 3)

```text
Escreva a plataforma do projeto em meia página, seguindo referencias/identidade-e-logo.md: o que é
em uma frase sem adjetivo, para quem, voz em 3 adjetivos com o contrário que cada um recusa, 10
palavras concretas do mundo do assunto e os clichês do setor a evitar.
```

## 6. Logo (etapa 3)

```text
Crie o logo seguindo referencias/identidade-e-logo.md: (1) 3 metáforas do mundo do assunto; (2) 15
a 20 miniaturas em preto e branco, só forma, numa prancha; (3) eu escolho 2 ou 3; (4) redesenhe cada
uma em SVG com geometria explícita e poucos nós, com o nome ao lado; (5) teste em 16, 32 e 64 px, em
uma cor, em negativo e sobre o fundo de cada tema. Mostre os testes lado a lado e recomende um.
```

## 7. Tokens (etapa 4)

```text
Converta o território escolhido em tokens a partir de modelos/tokens.css, só com os temas que
escolhemos: primitivos, semânticos e o @theme (se o projeto usa Tailwind); tipo, espaço (base 4),
raio, sombra e movimento. Monte o contraste.json a partir de modelos/contraste.json e rode
scripts/contraste.mjs até sair 0. Preencha o DESIGN.md na raiz a partir de modelos/DESIGN.md.
```

## 8. Componentes e vitrine (etapa 4)

```text
Monte os componentes-base de referencias/design-system.md sobre [shadcn/Radix/Base UI ou a base do
projeto], usando só tokens, com todos os estados (repouso, hover, pressionado, foco, desabilitado,
carregando, erro, vazio). Crie a página-vitrine em [/design] com cores, tipo, espaços, raios,
sombras e cada componente, em cada tema. Capture a vitrine em 390 e 1440 px e me mostre.
```

## 9. Variações de tela (etapa 5)

```text
Faça 4 versões de [tela] variando só [densidade | agrupamento | hierarquia]. Cada uma num arquivo
próprio, lado a lado na prancha de decisão, com uma linha de trade-off e a sua recomendação. Não
implemente nenhuma até eu escolher.
```

## 10. Movimento (etapa 6)

```text
Antes de codar, especifique o movimento de [interação]: gatilho, propriedade (transform/opacity),
duração (token), curva ou mola (token), origem espacial, escalonamento, interrupção e versão de
movimento reduzido. Não anime ações de teclado nem as que se repetem dezenas de vezes por dia.
```

## 11. Captura e crítica (etapa 7)

```text
Rode scripts/capturar.mjs em [url] com os nossos temas e abra a folha de contato. Critique com
checklists.md e referencias/anti-slop.md. Liste no máximo 5 problemas por gravidade (bloqueador,
alto, médio, detalhe), corrija bloqueadores e altos, recapture e mostre antes/depois. Pare quando
não houver bloqueador nem alto, ou depois de 3 rodadas, e me traga as capturas e o que sobrou.
```

## 12. Revisor de contexto limpo (etapa 7, antes da entrega)

```text
Use um subagente revisor que veja só as capturas finais, a URL local e os critérios (checklists.md e
referencias/anti-slop.md), sem o histórico desta conversa, com o prompt de
modelos/revisor-de-design.md. Achado sem evidência não conta.
```

## 13. Polimento (etapa 8)

```text
Faça a passada de detalhes invisíveis em [tela]: alinhamento óptico, raios concêntricos, sombras em 2
camadas, algarismos tabulares, text-wrap balance nos títulos e pretty nos parágrafos, aspas e
reticências tipográficas, espaço inquebrável entre número e unidade, foco visível 3:1, hover e
pressionado mais contrastados que o repouso, nada abaixo de 11 px, quebras no celular, viúvas. Antes
de acrescentar algo, tire um acessório. Mostre o antes/depois.
```

## 14. Copy (qualquer etapa)

```text
Reescreva os textos de [tela] do lado do usuário: verbo ativo, nome do que a pessoa controla, a mesma
palavra no botão e na confirmação, vazio que diz o que fazer, erro com causa e saída, sem desculpas.
Sem frases genéricas ("eleve", "desbloqueie", "sem esforço") e sem número sem fonte.
```

## 15. "Mais ousado" ou "mais calmo" (etapas 5–8)

```text
Deixe [seção] mais ousada sem mudar o sistema: display com 3× ou mais o tamanho do corpo, peso mais
extremo, mais espaço negativo em volta do ponto focal, cor dominante no lugar de acentos espalhados.
Proibido: degradê, brilho, neon, sombra colorida, animação nova.
(Mais calmo: menos pesos, menos cor de acento, cromo e ícones recuam, separadores mais suaves.)
```

## 16. Auditoria anti-slop (etapas 2, 7 e 8)

```text
Audite [tela] contra referencias/anti-slop.md. Para cada sinal: mantenha com justificativa ligada ao
brief ou troque pela alternativa da lista. Mostre antes/depois.
```

## 17. Imagem gerada por IA

```text
Antes de gerar, me diga o custo estimado e espere o OK. Gere 4 variações para [uso: capa | post |
mockup], proporção [x:y]. Prompt: assunto; composição e enquadramento; lente; luz; materiais e
texturas do mundo do assunto; paleta em hex dos tokens; clima; texto em cena exato (se houver).
Proibido: logo de terceiros, pessoa ou depoimento inventado, texto ilegível. Registre modelo, prompt,
seed e custo num PROMPTS.md junto das imagens.
```
