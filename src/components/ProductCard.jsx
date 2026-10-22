import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ProductImage from '@/components/ProductImage'
import { formatarPreco } from '@/utils'

// COMPONENTE reutilizável: um card para cada produto.
// PROPS: produto (objeto), qtdNoCarrinho (número), onAdicionar (função).

function ProductCard({ produto, qtdNoCarrinho, onAdicionar }) {
  const { id, nome, detalhe, preco, precoAntigo, estoque, novo } = produto

  const esgotado = estoque === 0
  const limiteAtingido = qtdNoCarrinho >= estoque
  const desconto = precoAntigo ? Math.round((1 - preco / precoAntigo) * 100) : 0

  return (
    <Card className="w-full gap-0 border-0 bg-transparent py-0 shadow-none">
      <div className="relative overflow-hidden rounded-2xl">
        <ProductImage produto={produto} tamanho={600} className={esgotado ? 'aspect-square w-full opacity-50 grayscale' : 'aspect-square w-full'} />

        {/* Renderização condicional: cada selo aparece apenas se a condição for verdadeira */}
        <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {novo && <Badge>Novo</Badge>}
          {precoAntigo && <Badge variant="destructive">{desconto}% off</Badge>}
          {esgotado && <Badge variant="dark">Esgotado</Badge>}
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="text-2xl leading-tight">{nome}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{detalhe}</p>

        <p className="mt-3 flex items-baseline gap-2 tabular-nums">
          <strong className="text-lg font-semibold">{formatarPreco(preco)}</strong>
          {precoAntigo && (
            <s className="text-sm text-muted-foreground">
              <span className="sr-only">de </span>
              {formatarPreco(precoAntigo)}
            </s>
          )}
        </p>

        {/* Renderização condicional com ternário aninhado: o rótulo muda conforme o estado */}
        <Button variant="outline" className="mt-4 w-full" onClick={() => onAdicionar(id)} disabled={esgotado || limiteAtingido}>
          {esgotado ? 'Indisponível' : limiteAtingido ? 'Limite de estoque' : 'Adicionar ao carrinho'}
        </Button>

        {qtdNoCarrinho > 0 && <p className="mt-2 text-center text-sm text-primary tabular-nums">No carrinho: {qtdNoCarrinho}</p>}
      </CardContent>
    </Card>
  )
}

export default ProductCard
