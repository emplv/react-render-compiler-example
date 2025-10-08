import * as React from 'react'
import { cn } from '../../lib-cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant='default', size='md', ...props }, ref) => {
    const base = 'btn-base'
    const variants = {
      default: 'bg-accent text-black border-accent/30 hover:shadow',
      outline: 'bg-transparent text-foreground border-border',
      ghost: 'bg-transparent text-foreground border-transparent hover:bg-white/5'
    }
    const sizes = { sm: 'h-9 px-3 text-sm rounded-xl', md: 'h-10 px-4 text-base' }
    return <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  }
)
Button.displayName = 'Button'
