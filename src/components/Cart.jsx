import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import CartItem from '@/components/CartItem'
import FreteCalculator from '@/components/FreteCalculator'
import { FRETE_GRATIS_A_PARTIR_DE } from '@/data/produtos'
import { formatarPreco } from '@/utils'

// O carrinho é um Sheet (painel lateral do shadcn/ui). Quem controla se está aberto
// é o App, por isso recebemos `aberto` e `onAbertoChange` por PROPS.

function Cart({ aberto, onAbertoChange, itens, total, freteEntrega, onFreteCalculado, onAlterarQtd, onRemover, onLimpar }) {
  const [confirmandoLimpar, setConfirmandoLimpar] = useState(false)
  const [pedidoFeito, setPedidoFeito] = useState(false)

  const temFreteGratis = total >= FRETE_GRATIS_A_PARTIR_DE
  const faltaParaFrete = FRETE_GRATIS_A_PARTIR_DE - total
  const progresso = Math.min(100, (total / FRETE_GRATIS_A_PARTIR_DE) * 100)
  const valorFrete = temFreteGratis ? 0 : freteEntrega?.valor ?? null
  const totalComFrete = total + (valorFrete ?? 0)

  function finalizar() {
    onLimpar()
    onFreteCalculado(null)
    setPedidoFeito(true)
  }

  function fechar(abrir) {
    if (!abrir) {
      setConfirmandoLimpar(false)
      setPedidoFeito(false)
    }
    onAbertoChange(abrir)
  }

  return (
    <Sheet open={aberto} onOpenChange={fechar}>
      <SheetContent className="overscroll-contain">
        <SheetHeader className="border-b">
          <SheetTitle className="font-display text-3xl font-normal">Seu carrinho</SheetTitle>
          <SheetDescription>Revise as peças e finalize a compra.</SheetDescription>
        </SheetHeader>

        {/* Renderização condicional em três estados: pedido feito, carrinho vazio ou com itens */}
        {pedidoFeito ? (
          <div className="px-5 py-10 text-center" role="status">
            <p className="font-display text-3xl">Pedido simulado</p>
            <p className="mt-2 text-muted-foreground">Este é um projeto de estudo, então nenhuma compra foi feita de verdade.</p>
            <Button className="mt-6" onClick={() => fechar(false)}>
              Continuar comprando
            </Button>
          </div>
        ) : itens.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <p className="font-display text-3xl">Seu carrinho está vazio</p>
            <p className="mt-2 text-muted-foreground">Escolha uma peça no catálogo para começar.</p>
            <Button variant="outline" className="mt-6" onClick={() => fechar(false)}>
              Ver o catálogo
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-secondary px-5 py-3 text-sm" aria-live="polite">
              {!temFreteGratis ? (
                <p>
                  Faltam <strong className="tabular-nums">{formatarPreco(faltaParaFrete)}</strong> para o frete grátis.
                </p>
              ) : (
                <p>
                  <strong>Você ganhou frete grátis.</strong>
                </p>
              )}
              <Progress value={progresso} className="mt-2 bg-white/80" aria-label="Progresso para o frete grátis" />
            </div>

            {/* LISTA + KEY: um <CartItem> para cada item, com key = id do produto */}
            <div className="flex-1 overflow-y-auto px-5">
              <ul>
                {itens.map((item) => (
                  <CartItem key={item.id} item={item} onAlterarQtd={onAlterarQtd} onRemover={onRemover} />
                ))}
              </ul>
              {!temFreteGratis && (
                <FreteCalculator
                  total={total}
                  onFreteCalculado={onFreteCalculado}
                  className="my-4 rounded-2xl border bg-card p-4"
                />
              )}
            </div>

            <SheetFooter className="border-t">
              <div className="space-y-1 text-sm tabular-nums">
                <p className="flex items-baseline justify-between">
                  <span>Subtotal</span>
                  <span>{formatarPreco(total)}</span>
                </p>
                <p className="flex items-baseline justify-between">
                  <span>Frete{freteEntrega && !temFreteGratis ? ` (${freteEntrega.uf})` : ''}</span>
                  <span>
                    {temFreteGratis
                      ? 'Grátis'
                      : valorFrete === null
                        ? 'Informe o CEP'
                        : formatarPreco(valorFrete)}
                  </span>
                </p>
                <p className="flex items-baseline justify-between pt-2 text-lg">
                  <strong>Total</strong>
                  <strong>{formatarPreco(totalComFrete)}</strong>
                </p>
              </div>
              <Button size="lg" onClick={finalizar}>
                Finalizar compra
              </Button>

              {confirmandoLimpar ? (
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span>Remover todas as peças?</span>
                  <span className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setConfirmandoLimpar(false)}>
                      Cancelar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => { onLimpar(); onFreteCalculado(null); setConfirmandoLimpar(false) }}>
                      Esvaziar
                    </Button>
                  </span>
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setConfirmandoLimpar(true)}>
                  Esvaziar carrinho
                </Button>
              )}
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart
