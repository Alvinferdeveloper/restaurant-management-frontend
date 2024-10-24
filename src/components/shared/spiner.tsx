import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'muted'
}

export default function Spinner({ size = 'md', color = 'primary', className, ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    muted: 'text-muted-foreground'
  }

  return (
    <div className=" w-full h-full flex justify-center">
        <div
      role="status"
      className={cn("animate-spin", sizeClasses[size], colorClasses[color], className)}
      {...props}
    >
      <Loader2 className="w-full h-full" />
      <span className="sr-only">Cargando...</span>
    </div>
    </div>
  )
}