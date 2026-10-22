import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// LISTA + KEY: cada categoria vira um botão. A key é o próprio nome (único na lista).

function CategoryFilter({ categorias, ativa, onSelecionar }) {
  return (
    <ToggleGroup
      type="single"
      value={ativa}
      onValueChange={(valor) => valor && onSelecionar(valor)}
      aria-label="Filtrar por categoria"
      className="mb-8"
    >
      {categorias.map((categoria) => (
        <ToggleGroupItem key={categoria} value={categoria} variant="outline" size="sm">
          {categoria}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export default CategoryFilter
