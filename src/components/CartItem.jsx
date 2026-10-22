import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductImage from '@/components/ProductImage'
import { formatarPreco } from '@/utils'

function CartItem({ item, onAlterarQtd, onRemover }) {
  const { id, nome, preco, estoque, qtd } = item

  return (
    <li className="grid grid-cols-[4rem_1fr_auto] gap-3 border-b py-4">
      <ProductImage produto={item} tamanho={128} className="size-16 rounded-xl" />

      <div className="min-w-0 text-sm">
        <p className="truncate font-medium">{nome}</p>
        <p className="text-muted-foreground tabular-nums">{formatarPreco(preco)}</p>

        <div className="mt-2 inline-flex items-center gap-2">
          <Button variant="outline" size="icon" className="size-8 rounded-full" onClick={() => onAlterarQtd(id, -1)} aria-label={`Diminuir quantidade de ${nome}`}>
            <Minus aria-hidden="true" />
          </Button>
          <span className="w-5 text-center tabular-nums" aria-live="polite">
            {qtd}
          </span>
          <Button variant="outline" size="icon" className="size-8 rounded-full" onClick={() => onAlterarQtd(id, +1)} disabled={qtd >= estoque} aria-label={`Aumentar quantidade de ${nome}`}>
            <Plus aria-hidden="true" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between text-sm">
        <strong className="tabular-nums">{formatarPreco(preco * qtd)}</strong>
        <Button variant="link" size="sm" className="h-auto p-0 text-destructive" onClick={() => onRemover(id)}>
          Remover<span className="sr-only"> {nome}</span>
        </Button>
      </div>
    </li>
  )
}

export default CartItem
