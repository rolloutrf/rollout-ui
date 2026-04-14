import * as React from 'react'
import { cn } from '@/lib/utils'

type AvatarStatus = 'idle' | 'loading' | 'loaded' | 'error'

const AvatarContext = React.createContext<{
  status: AvatarStatus
  setStatus: (s: AvatarStatus) => void
}>({ status: 'idle', setStatus: () => {} })

const Avatar = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, children, ...props }, ref) => {
    const [status, setStatus] = React.useState<AvatarStatus>('idle')
    return (
      <AvatarContext.Provider value={{ status, setStatus }}>
        <div
          ref={ref}
          className={cn(
            'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AvatarContext.Provider>
    )
  }
)
Avatar.displayName = 'Avatar'

const AvatarImage = React.forwardRef<HTMLImageElement, React.ComponentProps<'img'>>(
  ({ className, onLoad, onError, ...props }, ref) => {
    const { status, setStatus } = React.useContext(AvatarContext)

    React.useEffect(() => {
      if (props.src) setStatus('loading')
      else setStatus('error')
    }, [props.src])

    if (status === 'error') return null

    return (
      <img
        ref={ref}
        className={cn('aspect-square h-full w-full object-cover', className)}
        onLoad={(e) => {
          setStatus('loaded')
          onLoad?.(e)
        }}
        onError={(e) => {
          setStatus('error')
          onError?.(e)
        }}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    const { status } = React.useContext(AvatarContext)
    if (status === 'loaded') return null
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-full w-full items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium',
          className
        )}
        {...props}
      />
    )
  }
)
AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }
