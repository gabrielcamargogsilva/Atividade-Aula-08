import { cva } from 'class-variance-authority'
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils'

// shadcn/ui ToggleGroup (versão simplificada): grupo de botões com seleção única,
// navegável por setas do teclado.

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow] outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-input bg-white/60',
      },
      size: {
        default: 'h-10 min-w-10 px-4',
        sm: 'h-9 min-w-9 px-3',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

function ToggleGroup({ className, children, ...props }) {
  return (
    <ToggleGroupPrimitive.Root data-slot="toggle-group" className={cn('flex flex-wrap items-center gap-2', className)} {...props}>
      {children}
    </ToggleGroupPrimitive.Root>
  )
}

function ToggleGroupItem({ className, variant, size, children, ...props }) {
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      className={cn(toggleVariants({ variant, size }), 'rounded-full', className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
