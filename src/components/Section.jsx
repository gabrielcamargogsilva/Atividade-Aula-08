// Componente de layout reutilizável. Recebe título, descrição e `children` por PROPS.
// Renderização condicional: a descrição só aparece se for informada.

function Section({ titulo, descricao, id, children }) {
  return (
    <section id={id} className="mt-24" aria-labelledby={`${id}-titulo`}>
      <header className="mb-8 max-w-2xl">
        <h2 id={`${id}-titulo`} className="text-4xl leading-tight sm:text-5xl">
          {titulo}
        </h2>
        {descricao && <p className="mt-3 text-muted-foreground">{descricao}</p>}
      </header>
      {children}
    </section>
  )
}

export default Section
