import { useState } from 'react'
import ProductIcon from '@/components/ProductIcon'
import { urlFoto } from '@/data/produtos'

// Mostra a foto do produto (Unsplash). Se a imagem não carregar (sem internet,
// link removido...), a ilustração em SVG assume o lugar: renderização condicional
// controlada por estado.
//
// `loading="lazy"` adia o download das fotos que ainda estão fora da tela, e
// width/height reservam o espaço para a página não "pular" quando a foto chega.

function ProductImage({ produto, tamanho = 600, prioridade = false, className = '' }) {
  const [falhou, setFalhou] = useState(false)

  if (falhou) {
    return (
      <div className={`grid place-items-center bg-linear-to-br from-white to-secondary ${className}`}>
        <ProductIcon tipo={produto.tipo} id={`f${produto.id}`} nome={produto.fotoAlt} className="w-3/5" />
      </div>
    )
  }

  return (
    <img
      src={urlFoto(produto.foto, tamanho)}
      srcSet={`${urlFoto(produto.foto, Math.round(tamanho / 2))} ${Math.round(tamanho / 2)}w, ${urlFoto(produto.foto, tamanho)} ${tamanho}w, ${urlFoto(produto.foto, tamanho * 2)} ${tamanho * 2}w`}
      sizes={`(min-width: 1024px) ${Math.round(tamanho / 2)}px, 50vw`}
      alt={produto.fotoAlt}
      width={tamanho}
      height={tamanho}
      loading={prioridade ? 'eager' : 'lazy'}
      fetchpriority={prioridade ? 'high' : 'auto'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFalhou(true)}
      className={`bg-secondary object-cover ${className}`}
    />
  )
}

export default ProductImage
