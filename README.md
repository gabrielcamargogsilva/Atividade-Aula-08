# Luna Semijoias: e-commerce em React + Vite

Projeto da disciplina de Frameworks Front End.
Stack: React 18, Vite, Tailwind CSS v4 e componentes no padrão shadcn/ui.

## Como rodar

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera a versão de produção em /dist
```

## Conceitos de React abordados em aula

O projeto foi desenvolvido colocando em prática os seis conceitos fundamentais de React aprendidos em aula:

| Conceito | Onde ver no código |
|---|---|
| JSX | A interface é descrita com JSX nos componentes, combinando marcação HTML com expressões JavaScript. |
| Componentes | A aplicação é dividida em componentes reutilizáveis, como `Header`, `Hero`, `ProductList`, `ProductCard` e `Cart`, em `src/components/`. |
| Props | O `App` compartilha dados e funções com os componentes filhos, como os produtos e a ação de adicionar ao carrinho. O componente `Section` também recebe conteúdo por `children`. |
| Virtual DOM | Ao alterar a busca, a categoria ou o carrinho, o React compara a nova árvore de elementos com a anterior e atualiza no DOM real apenas o que mudou. |
| Listas e Keys | `ProductList`, `Cart` e `CategoryFilter` renderizam coleções com `map` e identificadores estáveis em `key`. |
| Renderização condicional | A interface apresenta estados diferentes conforme os dados: mensagem quando a busca não encontra produtos e contador do carrinho somente quando há itens. |

## Funcionalidades

- Fotos reais do Unsplash (hero, catálogo e carrinho), com ilustração em SVG como reserva se a foto não carregar
- 12 peças, filtro por categoria e busca por nome, refletidos na URL (`?categoria=Colares`)
- Página de detalhes por produto (`/produto/:id`) com consulta de endereço pela API pública ViaCEP
- Carrinho em painel lateral com quantidade, limite de estoque, total e barra de frete grátis (a partir de R$ 200)
- Consulta de CEP e estimativa de frete no carrinho quando o pedido ainda não alcança o valor mínimo para frete grátis

Na página de detalhes e no carrinho, o ViaCEP localiza o endereço e a UF para estimar o frete. O serviço não calcula o preço do frete; as faixas por região são regras didáticas da loja.

O cálculo estimado usa a UF consultada pelo ViaCEP: Norte, Nordeste e Centro-Oeste (R$ 50), Sudeste (R$ 20) e Sul (R$ 30). Depois de consultar um CEP válido, o carrinho soma o frete ao subtotal das peças e exibe o total. Pedidos a partir de R$ 200 têm frete grátis. Os valores são ilustrativos e não representam uma cotação real de transportadora.

## Fotos

As fotos são carregadas direto do Unsplash (`images.unsplash.com`), então o projeto precisa de internet
para mostrá-las. Os códigos e os links das páginas originais ficam em `src/data/produtos.js`, e os créditos
aparecem no rodapé. Para trocar uma foto, altere os campos `foto`, `fotoAlt` e `fotoPagina` do produto.

## shadcn/ui

O `components.json` está configurado (JavaScript, alias `@`, CSS em `src/styles.css`).
Os componentes de `src/components/ui` seguem o código oficial do estilo new-york:
button, badge, card, input, progress, sheet e toggle-group. Para adicionar outros ou
atualizar os existentes no seu computador:

```bash
npx shadcn@latest add dialog
```

## Acessibilidade e boas práticas

Revisado contra as Web Interface Guidelines da Vercel: link para pular ao catálogo,
foco visível em tudo, rótulos em botões só com ícone, `prefers-reduced-motion`,
números tabulares nos preços, `Intl` para moeda, sem `transition: all`, sem zoom bloqueado.

## Autor

- **Gabriel Camargo Gonçalves Silva**
  - [GitHub](https://github.com/gabrielcamargogsilva)
  - [LinkedIn](https://www.linkedin.com/in/gabriel-camargo-dev)
  - [Email](mailto:gabrielcamargogsilva@gmail.com)
