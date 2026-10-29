import { useEffect, useId, useState } from 'react'
import { FRETE_GRATIS_A_PARTIR_DE, FRETE_POR_UF } from '@/data/produtos'
import { formatarPreco } from '@/utils'

function FreteCalculator({ className = '', total = 0, onFreteCalculado }) {
  const id = useId()
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (cep.length !== 8) {
      setEndereco(null)
      setStatus('idle')
      onFreteCalculado?.(null)
      return
    }

    const controller = new AbortController()
    setEndereco(null)
    setStatus('loading')
    onFreteCalculado?.(null)

    fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: controller.signal })
      .then((resposta) => {
        if (!resposta.ok) throw new Error(`Falha na consulta: HTTP ${resposta.status}`)
        return resposta.json()
      })
      .then((dados) => {
        if (dados.erro) {
          setStatus('not-found')
          return
        }

        setEndereco(dados)
        setStatus('success')
        const frete = FRETE_POR_UF[dados.uf]
        onFreteCalculado?.(frete ? { cep, uf: dados.uf, ...frete } : null)
      })
      .catch((erro) => {
        if (erro.name === 'AbortError') return
        console.error('Erro ao consultar o ViaCEP:', erro)
        setStatus('error')
        onFreteCalculado?.(null)
      })

    return () => controller.abort()
  }, [cep, onFreteCalculado])

  return (
    <section aria-labelledby={`${id}-frete-titulo`} className={className}>
      <h2 id={`${id}-frete-titulo`} className="text-2xl">Ver valor do frete</h2>
      <p className="mt-2 text-sm text-muted-foreground">Informe seu CEP para consultar o endereço de entrega.</p>

      <label htmlFor={`${id}-cep`} className="mt-4 block text-sm font-medium">
        CEP
      </label>
      <input
        id={`${id}-cep`}
        name={`${id}-cep`}
        type="text"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={8}
        pattern="[0-9]{8}"
        value={cep}
        onChange={(evento) => {
          onFreteCalculado?.(null)
          setCep(evento.target.value.replace(/\D/g, '').slice(0, 8))
        }}
        placeholder="Ex.: 01001000"
        aria-describedby={`${id}-cep-ajuda ${id}-cep-resultado`}
        className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-base shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:max-w-xs"
      />
      <p id={`${id}-cep-ajuda`} className="mt-2 text-xs text-muted-foreground">Digite os 8 números do CEP.</p>

      <div id={`${id}-cep-resultado`} className="mt-4 text-sm" aria-live="polite" aria-atomic="true">
        {cep.length > 0 && cep.length < 8 && (
          <p className="text-muted-foreground">Faltam {8 - cep.length} números para completar o CEP.</p>
        )}
        {status === 'loading' && <p>Buscando endereço...</p>}
        {status === 'not-found' && <p role="status">CEP não encontrado. Confira os números e tente novamente.</p>}
        {status === 'error' && <p role="alert">Não foi possível consultar o CEP. Verifique sua conexão e tente novamente.</p>}
        {status === 'success' && endereco && (
          <div>
            <p>
              <strong>Entrega para:</strong>{' '}
              {[endereco.logradouro, endereco.bairro, endereco.localidade, endereco.uf].filter(Boolean).join(', ')}
            </p>
            {total >= FRETE_GRATIS_A_PARTIR_DE ? (
              <p className="mt-2 font-medium text-primary">
                Frete grátis: seu pedido atingiu {formatarPreco(FRETE_GRATIS_A_PARTIR_DE)}.
              </p>
            ) : FRETE_POR_UF[endereco.uf] ? (
              <p className="mt-2 text-muted-foreground">
                Frete estimado para a região {FRETE_POR_UF[endereco.uf].regiao}:{' '}
                <strong className="text-foreground">{formatarPreco(FRETE_POR_UF[endereco.uf].valor)}</strong>.
              </p>
            ) : (
              <p className="mt-2 text-muted-foreground" role="status">
                Não foi possível calcular o frete para este estado.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default FreteCalculator
