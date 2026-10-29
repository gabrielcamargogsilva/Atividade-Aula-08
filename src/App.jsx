import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Section from '@/components/Section'
import CategoryFilter from '@/components/CategoryFilter'
import ProductList from '@/components/ProductList'
import Cart from '@/components/Cart'
import { produtos, categorias } from '@/data/produtos'
import Detalhes from '@/pages/Detalhes'

// App é o componente raiz: guarda o estado compartilhado (busca, categoria,
// carrinho) e o distribui para os filhos por PROPS. Os filhos devolvem eventos
// chamando as funções recebidas (onAdicionar, onAlterarQtd...).

// Filtros e busca ficam na URL (?categoria=Colares&busca=ouro), então
// o link pode ser compartilhado e o botão "voltar" continua fazendo sentido.
function lerUrl() {
  const p = new URLSearchParams(window.location.search)
  const categoria = p.get('categoria')
  return {
    categoria: categorias.includes(categoria) ? categoria : 'Todas',
    busca: p.get('busca') ?? '',
  }
}

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [inicial] = useState(lerUrl)
  const [busca, setBusca] = useState(inicial.busca)
  const buscaAnterior = useRef(inicial.busca)
  const [categoria, setCategoria] = useState(inicial.categoria)
  const [carrinho, setCarrinho] = useState([]) // [{ id, qtd }]
  const [freteEntrega, setFreteEntrega] = useState(null)
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)

  useEffect(() => {
    if (location.pathname !== '/') return

    const p = new URLSearchParams()
    if (categoria !== 'Todas') p.set('categoria', categoria)
    if (busca.trim()) p.set('busca', busca.trim())
    const qs = p.toString()
    navigate({ pathname: '/', search: qs ? `?${qs}` : '' }, { replace: true })
  }, [categoria, busca, location.pathname, navigate])

  useEffect(() => {
    const iniciouBusca = !buscaAnterior.current.trim() && busca.trim()
    buscaAnterior.current = busca
    if (!iniciouBusca) return

    const frame = window.requestAnimationFrame(() => {
      const lista = document.getElementById('produtos')
      if (!lista) return

      const cabecalho = document.querySelector('header')
      const alturaCabecalho = cabecalho?.getBoundingClientRect().height ?? 0
      const topo = lista.getBoundingClientRect().top + window.scrollY - alturaCabecalho - 16
      window.scrollTo({ top: Math.max(0, topo), behavior: 'smooth' })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [busca])

  // Dados derivados: calculados a cada render a partir do estado.
  const produtosVisiveis = produtos.filter((p) => {
    const bateCategoria = categoria === 'Todas' || p.categoria === categoria
    const bateBusca = p.nome.toLowerCase().includes(busca.trim().toLowerCase())
    return bateCategoria && bateBusca
  })

  const itensDoCarrinho = carrinho.map((item) => ({
    ...produtos.find((p) => p.id === item.id),
    qtd: item.qtd,
  }))
  const totalItens = carrinho.reduce((soma, item) => soma + item.qtd, 0)
  const totalPreco = itensDoCarrinho.reduce((soma, item) => soma + item.preco * item.qtd, 0)

  // Nunca alteramos o estado diretamente: sempre criamos um novo array.
  function adicionar(id) {
    setCarrinho((atual) => {
      const existe = atual.find((item) => item.id === id)
      if (existe) {
        return atual.map((item) => (item.id === id ? { ...item, qtd: item.qtd + 1 } : item))
      }
      return [...atual, { id, qtd: 1 }]
    })
  }

  function alterarQtd(id, delta) {
    setCarrinho((atual) =>
      atual.map((item) => (item.id === id ? { ...item, qtd: item.qtd + delta } : item)).filter((item) => item.qtd > 0),
    )
  }

  function remover(id) {
    setCarrinho((atual) => atual.filter((item) => item.id !== id))
  }

  function limparFiltros() {
    setBusca('')
    setCategoria('Todas')
  }

  function buscar(texto) {
    setBusca(texto)
    if (location.pathname !== '/') navigate('/')
  }

  const contagem =
    produtosVisiveis.length === 0
      ? 'Nenhuma peça encontrada'
      : `${produtosVisiveis.length} ${produtosVisiveis.length === 1 ? 'peça' : 'peças'}`

  return (
    <div id="topo">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Pular para o conteúdo principal
      </a>

      <Header busca={busca} onBuscar={buscar} totalItens={totalItens} onAbrirCarrinho={() => setCarrinhoAberto(true)} />

      <main id="conteudo-principal" className="mx-auto max-w-6xl px-4 pb-24 sm:px-8">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Section id="catalogo" titulo="Catálogo" descricao="Anéis, colares, brincos e pulseiras para todos os dias.">
                  <CategoryFilter categorias={categorias} ativa={categoria} onSelecionar={setCategoria} />
                  <p className="-mt-2 mb-6 text-sm text-muted-foreground" aria-live="polite">
                    {contagem}
                  </p>
                  <ProductList
                    produtos={produtosVisiveis}
                    carrinho={carrinho}
                    onAdicionar={adicionar}
                    onLimparFiltros={limparFiltros}
                  />
                </Section>
              </>
            }
          />
          <Route
            path="/produto/:id"
            element={
              <Detalhes
                carrinho={carrinho}
                total={totalPreco}
                onFreteCalculado={setFreteEntrega}
                onAdicionar={adicionar}
              />
            }
          />
          <Route path="*" element={<p className="py-16 text-center">Página não encontrada.</p>} />
        </Routes>
      </main>

      <footer className="border-t py-10 text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl px-4 sm:px-8">
          <p>GB Semijoias, projeto de estudo em React + Vite.</p>

          <details className="mt-4">
            <summary className="w-fit cursor-pointer rounded-sm underline underline-offset-4 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none">
              Créditos das fotos
            </summary>
            <p className="mt-3 max-w-2xl">
              Todas as fotos vêm do{' '}
              <a href="https://unsplash.com" className="underline underline-offset-4" target="_blank" rel="noreferrer">
                Unsplash
              </a>
              . Cada link abaixo leva à página da foto original, com o nome de quem a tirou.
            </p>
            {/* LISTA + KEY: um link de crédito para cada produto */}
            <ul className="mt-3 grid gap-x-8 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {produtos.map((p) => (
                <li key={p.id}>
                  <a href={p.fotoPagina} className="underline underline-offset-4" target="_blank" rel="noreferrer">
                    {p.nome}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </footer>

      <Cart
        aberto={carrinhoAberto}
        onAbertoChange={setCarrinhoAberto}
        itens={itensDoCarrinho}
        total={totalPreco}
        freteEntrega={freteEntrega}
        onFreteCalculado={setFreteEntrega}
        onAlterarQtd={alterarQtd}
        onRemover={remover}
        onLimpar={() => setCarrinho([])}
      />
    </div>
  )
}

export default App
