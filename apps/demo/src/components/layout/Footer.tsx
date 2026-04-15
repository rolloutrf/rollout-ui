import { Twitter, Linkedin, Send } from 'lucide-react'

export function Footer() {
  return (
    <footer className="flex justify-center items-center py-4 px-1 w-full mb-4 md:mb-0">
      <div className="flex flex-col justify-center items-stretch gap-2.5 w-full">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm font-normal text-muted-foreground">© 2025 Rollout</span>
          <div className="flex items-center gap-3">
            <Twitter size={16} className="text-muted-foreground" />
            <Linkedin size={16} className="text-muted-foreground" />
            <Send size={16} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </footer>
  )
}
