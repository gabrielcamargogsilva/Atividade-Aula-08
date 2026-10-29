import { Button } from '@/components/ui/button'
import ProductImage from '@/components/ProductImage'
import { IDS_HERO, produtos } from '@/data/produtos'


function Hero() {
  const principal = produtos.find((p) => p.id === IDS_HERO.principal)
  const apoio = produtos.find((p) => p.id === IDS_HERO.apoio)

  return (
    <div className="grid items-center gap-12 pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
      <div>
        <h1 className="text-5xl leading-[1.02] tracking-tight sm:text-7xl">Brilho de joia, preço de semijoia</h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
          Anéis, colares, brincos e pulseiras para usar todos os dias. Frete grátis a partir de R$&nbsp;200.
        </p>

        <Button asChild size="lg" className="mt-10">
          <a href="#catalogo">Ver o catálogo</a>
        </Button>
      </div>

      <div className="relative mx-auto w-full max-w-md pb-10 pl-6">
        <ProductImage produto={principal} tamanho={900} prioridade className="aspect-[4/5] w-full rounded-t-full rounded-b-3xl shadow-[0_30px_60px_-30px_rgba(43,31,77,0.6)]" />
        <ProductImage produto={apoio} tamanho={400} prioridade className="absolute bottom-0 left-0 size-36 rounded-full border-4 border-background sm:size-44" />
      </div>
    </div>
  )
}

export default Hero
