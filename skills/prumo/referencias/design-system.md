# Design system

Carregue na etapa 4. Um design system pequeno e completo vence um grande e pela metade. Para um projeto começando,
ele é: tokens, escala de tipo, uns 10 componentes com todos os estados, uma página-vitrine e o DESIGN.md.

## 1. Tokens

Parta de [modelos/tokens.css](../modelos/tokens.css). Três camadas:

- **Primitivos:** a paleta crua (escalas de neutro e de acento). Ninguém usa direto no componente.
- **Semânticos:** o papel de cada cor (fundo, superfície, texto-1 a 3, borda, acento, texto-sobre-acento,
  sucesso, perigo, aviso, informação), definidos por tema. **Componente só usa semântico.**
- **De componente:** só quando um componente precisa de um valor próprio.

Além de cor: escala de tipo, espaço (base 4), raios, sombras, durações e curvas também são tokens.

**Temas.** O `tokens.css` traz os três modos prontos para escolher na etapa 0:

| Escolha | Como fica |
|---|---|
| Só claro | Mantenha só o bloco `:root` e apague o tema escuro |
| Só escuro | Ponha os valores escuros direto no `:root` e apague o resto |
| Os dois | `:root` claro + escuro por `prefers-color-scheme`, com `[data-tema]` para um seletor manual |

Para cada tema escolhido, monte os pares no `contraste.json` e rode `scripts/contraste.mjs` até sair 0.
Detalhes de escala, OKLCH e contraste em [tipografia e cor](tipografia-e-cor.md).

## 2. Componentes-base

Use uma base acessível (shadcn/ui, Radix, Base UI, ou a do framework do projeto) tematizada pelos tokens. O mínimo
para começar:

botão (primário, secundário, fantasma, perigo) · campo de texto · seleção · caixa de marcação e alternador ·
cartão · diálogo · menu · aba · aviso (toast) · tabela · estado vazio · esqueleto de carregamento

Cada um com **todos os estados**: repouso, hover, pressionado, foco visível, desabilitado, carregando, erro e
vazio. Além deles, as 1 ou 2 **peças-assinatura** do território (o elemento ousado), desenhadas aqui.

## 3. Página-vitrine

Uma rota do próprio projeto (ex.: `/design`) que mostra tudo: cores com nome e contraste, escala de tipo, espaços,
raios, sombras e cada componente em todos os estados, em cada tema escolhido. Ela serve para três coisas:

- O dono aprova o sistema olhando uma página só.
- A captura (`scripts/capturar.mjs <url>/design`) vira o teste de regressão do sistema inteiro.
- Quem chega depois (ou outra sessão do Claude) vê o que já existe antes de criar um componente novo.

## 4. DESIGN.md

Preencha [modelos/DESIGN.md](../modelos/DESIGN.md) na raiz do projeto: o porquê de cada escolha, os temas
adotados, o que fazer e o que não fazer. É o arquivo que o Claude lê antes de mexer no visual; mudou token,
atualiza o DESIGN.md no mesmo commit.

## 5. Portão

- [ ] `scripts/contraste.mjs` sai 0 para cada tema.
- [ ] Os dois `grep` de cor solta saem 1 ([QA](qa.md)).
- [ ] Vitrine capturada em 390 e 1440 px, em cada tema, e aprovada pelo dono.
- [ ] DESIGN.md preenchido e coerente com os tokens.
