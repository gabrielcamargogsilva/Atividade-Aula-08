import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Dados (busca, totalItens) e funções (onBuscar, onAbrirCarrinho) chegam por PROPS.
// O Header não guarda estado do carrinho: quem manda é o componente pai (App).

function Header({ busca, onBuscar, totalItens, onAbrirCarrinho }) {
  return (
    <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3 sm:px-8">
        <a href="#topo" className="font-display text-3xl leading-none text-primary focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none">
          GB Semijoias
        </a>

        <div className="order-3 w-full sm:order-none sm:ml-auto sm:w-72">
          <label htmlFor="busca" className="sr-only">
            Buscar joia pelo nome
          </label>
          <Input
            id="busca"
            name="busca"
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="Buscar joia…"
            value={busca}
            onChange={(e) => onBuscar(e.target.value)}
          />
        </div>

        <Button onClick={onAbrirCarrinho} className="ml-auto rounded-full sm:ml-0">
          <ShoppingBag aria-hidden="true" />
          Carrinho
          {/* Renderização condicional com &&: o contador só existe se houver itens */}
          {totalItens > 0 && (
            <span className="ml-1 grid min-w-5 place-items-center rounded-full bg-ouro px-1.5 text-xs font-semibold text-foreground tabular-nums">
              {totalItens}
              <span className="sr-only"> {totalItens === 1 ? 'item' : 'itens'}</span>
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}

export default Header
