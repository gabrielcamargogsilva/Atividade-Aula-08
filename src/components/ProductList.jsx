import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ProductCard'

// LISTAS E KEYS: transformamos o array de produtos em um array de <ProductCard />.
// A `key` precisa ser única e estável entre os irmãos: usamos o `id` do produto,
// nunca o índice do map (o índice muda quando filtramos ou reordenamos a lista).

function ProductList({ produtos, carrinho, onAdicionar, onLimparFiltros }) {
  // Renderização condicional com retorno antecipado (early return)
  if (produtos.length === 0) {
    return (
      <div id="produtos" className="rounded-2xl border border-dashed py-16 text-center">
        <p className="font-display text-3xl">Nenhuma joia encontrada</p>
        <p className="mt-2 text-muted-foreground">Tente outro nome ou volte para todas as categorias.</p>
        <Button variant="outline" className="mt-6" onClick={onLimparFiltros}>
          Limpar filtros
        </Button>
      </div>
    )
  }

  return (
    <ul id="produtos" className="grid grid-cols-1 gap-x-6 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {produtos.map((produto) => {
        const itemNoCarrinho = carrinho.find((item) => item.id === produto.id)

        return (
          <li key={produto.id} className="flex min-w-0">
            <ProductCard
              produto={produto}
              qtdNoCarrinho={itemNoCarrinho ? itemNoCarrinho.qtd : 0}
              onAdicionar={onAdicionar}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default ProductList
