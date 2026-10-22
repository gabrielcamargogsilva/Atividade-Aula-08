import { metais } from '@/data/produtos'

// COMPONENTE que desenha a peça em SVG. Recebe por PROPS o `tipo` (anel, colar...)
// e o `metal` escolhido: trocar o metal só muda as cores do gradiente.
// Como o SVG é código, não dependemos de fotos externas.

function ProductIcon({ tipo, id, metal = 'ouro', nome, className = '' }) {
  const [brilho, medio, sombra] = metais.find((m) => m.id === metal).cores
  const gradId = `metal-${id}`
  const suave = { transition: 'stop-color .5s ease' }

  return (
    <svg
      viewBox="10 10 80 80"
      width="100"
      height="100"
      role="img"
      aria-label={nome ?? tipo}
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ ...suave, stopColor: brilho }} />
          <stop offset="50%" style={{ ...suave, stopColor: medio }} />
          <stop offset="100%" style={{ ...suave, stopColor: sombra }} />
        </linearGradient>
      </defs>

      {tipo === 'anel' && (
        <g fill="none" stroke={`url(#${gradId})`} strokeWidth="5.5">
          <circle cx="50" cy="63" r="22" />
          <path d="M40 31 L50 19 L60 31 L50 43 Z" fill="#efeafc" stroke="#9a8fd0" strokeWidth="2" />
          <path d="M40 31 H60 M50 19 L46 31 L50 43 L54 31 Z" stroke="#9a8fd0" strokeWidth="1" />
        </g>
      )}

      {tipo === 'colar' && (
        <g fill="none" stroke={`url(#${gradId})`} strokeWidth="3.2" strokeLinecap="round">
          <path d="M14 20 C20 74 80 74 86 20" />
          <path d="M50 64 L50 70" />
          <circle cx="50" cy="77" r="7.5" fill="#efeafc" strokeWidth="2.6" />
        </g>
      )}

      {tipo === 'brinco' && (
        <g fill="none" stroke={`url(#${gradId})`} strokeWidth="3.2" strokeLinecap="round">
          <path d="M31 16 L31 33 M69 16 L69 33" />
          <path d="M31 33 C21 47 21 65 31 75 C41 65 41 47 31 33 Z" fill="#efeafc" strokeWidth="2.6" />
          <path d="M69 33 C59 47 59 65 69 75 C79 65 79 47 69 33 Z" fill="#efeafc" strokeWidth="2.6" />
        </g>
      )}

      {tipo === 'pulseira' && (
        <g fill={`url(#${gradId})`} stroke="none">
          {Array.from({ length: 12 }, (_, i) => {
            const ang = (i / 12) * Math.PI * 2
            return <circle key={i} cx={50 + Math.cos(ang) * 31} cy={50 + Math.sin(ang) * 31} r="6" />
          })}
        </g>
      )}
    </svg>
  )
}

export default ProductIcon
