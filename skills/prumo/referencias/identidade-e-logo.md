# Identidade e logo

Carregue na etapa 3. Quem já tem marca pula esta etapa e só traz o logo e as cores para os tokens.

## 1. Plataforma em meia página

Antes de desenhar, escreva (e mostre ao dono):

- **O que é, em uma frase**, sem adjetivo: "app que agenda banho e tosa em pet shops de bairro".
- **Para quem** e em que situação.
- **Voz em 3 adjetivos, cada um com o contrário que recusa:** "direto, não seco · caloroso, não infantil ·
  técnico, não frio". O contrário é o que torna o adjetivo útil.
- **O mundo do assunto:** 10 palavras, objetos, materiais e lugares concretos (no pet shop: escova, toalha,
  coleira, azulejo, secador). É daqui que saem forma, cor e textura.
- **Clichês do setor a evitar:** 3 a 5.

## 2. Logo: do esboço ao vetor

1. **Metáforas.** Escolha 3 ideias do mundo do assunto que traduzem o que o produto faz (não "tem IA", não
   "inovação").
2. **Miniaturas.** 15–20 esboços em preto e branco, só forma, pequenos. Pode ser SVG simples ou geração por IA
   **só para explorar**.
3. **Escolha.** O dono escolhe 2 ou 3 na [prancha](../modelos/prancha-decisao.html), com sua recomendação.
4. **Vetor de verdade.** Redesenhe em SVG com geometria explícita: grade, círculos e ângulos que se repetem, poucos
   nós, sem degradê. Logo gerado por IA não vai para produção: costuma ter nós demais, assimetria acidental e risco
   de parecer com marca existente.
5. **Logotipo.** Escolha a fonte do nome pelo território; ajuste o espaçamento entre letras à mão. Para não depender
   da fonte instalada, converta o texto em contorno no SVG final.
6. **Variações.** Símbolo sozinho, símbolo + nome horizontal, versão empilhada se precisar, ícone de app e favicon.

## 3. Testes antes de aprovar

- [ ] Legível em 16, 32 e 64 px (favicon e ícone de aba).
- [ ] Funciona em uma cor só, em positivo e em negativo.
- [ ] Funciona sobre o fundo de cada tema escolhido, e sobre foto.
- [ ] Não parece logo de outra marca do setor: busque imagens de logos parecidos antes de aprovar. Para registrar a
  marca, consulte o órgão de registro do país (no Brasil, o INPI).
- [ ] Não cai nos clichês da [lista anti-slop](anti-slop.md) (orbe com anel, faísca de quatro pontas, degradê
  roxo-azul).

## 4. Entrega

- Pasta `marca/` (ou `public/brand/`) com os SVG, PNG em 512/192/32 px e `favicon.ico`.
- O símbolo também em código, se for usado em React ou animação: os `path` vêm do SVG final, nunca redesenhados
  no olho.
- As cores e a fonte do logo entram nos tokens ([design system](design-system.md)).
- Uma página com o logo, as variações, a área de respiro e os usos proibidos (esticar, recolorir, sombra).
