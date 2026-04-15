interface ContentSlotProps {
  children?: React.ReactNode
}

export function ContentSlot({ children }: ContentSlotProps) {
  return (
    <main className="flex-1 flex items-center justify-center p-6 bg-accent/10 border border-dashed border-accent/50 max-w-xl w-full mx-auto">
      {children ?? <p className="text-sm text-foreground text-center">Content</p>}
    </main>
  )
}
