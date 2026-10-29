import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import ProductImage from '@/components/ProductImage'
import { Button } from '@/components/ui/button'
import FreteCalculator from '@/components/FreteCalculator'
import { produtos } from '@/data/produtos'
import { formatarPreco } from '@/utils'

function Detalhes({ carrinho, total, onFreteCalculado, onAdicionar }) {
  const { id } = useParams()
  const produto = produtos.find((item) => item.id === Number(id))
  const itemNoCarrinho = carrinho.find((item) => item.id === produto?.id)
  const quantidadeNoCarrinho = itemNoCarrinho?.qtd ?? 0
  if (!produto) {
    return (
      <section className="py-16 text-center">
        <h1 className="text-4xl">Produto não encontrado</h1>
        <p className="mt-3 text-muted-foreground">Esse produto não existe ou não está mais disponível.</p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/">
            <ArrowLeft aria-hidden="true" />
            Voltar ao catálogo
          </Link>
        </Button>
      </section>
    )
  }

  const esgotado = produto.estoque === 0
  const limiteAtingido = quantidadeNoCarrinho >= produto.estoque

  return (
    <article className="py-8">
      <Button asChild variant="link" className="mb-6 px-0">
        <Link to="/">
          <ArrowLeft aria-hidden="true" />
          Voltar ao catálogo
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2 md:items-start md:gap-12">
        <ProductImage
          produto={produto}
          tamanho={1000}
          prioridade
          className="aspect-square w-full rounded-2xl bg-secondary object-cover"
        />

        <div>
          <p className="text-sm text-muted-foreground">{produto.categoria}</p>
          <h1 className="mt-2 text-4xl sm:text-5xl">{produto.nome}</h1>
          <p className="mt-3 text-muted-foreground">{produto.detalhe}</p>
          <p className="mt-6 text-2xl font-semibold tabular-nums">{formatarPreco(produto.preco)}</p>
          {produto.precoAntigo && (
            <p className="mt-1 text-sm text-muted-foreground">
              De <s>{formatarPreco(produto.precoAntigo)}</s>
            </p>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            {esgotado ? 'Produto esgotado' : `${produto.estoque - quantidadeNoCarrinho} unidades disponíveis`}
          </p>

          <Button
            className="mt-6 w-full sm:w-auto"
            onClick={() => onAdicionar(produto.id)}
            disabled={esgotado || limiteAtingido}
          >
            <ShoppingBag aria-hidden="true" />
            {esgotado ? 'Indisponível' : limiteAtingido ? 'Limite de estoque atingido' : 'Adicionar ao carrinho'}
          </Button>

          <FreteCalculator
            total={total}
            onFreteCalculado={onFreteCalculado}
            className="mt-10 rounded-2xl border bg-card p-5 sm:p-6"
          />
        </div>
      </div>
    </article>
  )
}

export default Detalhes