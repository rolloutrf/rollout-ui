import { User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { DesktopNav } from '@/components/navigation/DesktopNav'
import { Avatar, AvatarFallback } from '@rollout/ui-kit'

interface HeaderProps {
  actionSlot?: React.ReactNode
}

export function Header({ actionSlot }: HeaderProps) {
  return (
    <header className="flex justify-between items-center py-4 fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-2xl backdrop-saturate-150 px-4">
      <div className="w-10 h-10 flex items-center justify-center">
        <img
          src="/images/logo.svg"
          width={24}
          height={24}
          alt="ROLLOUT"
          className="invert dark:invert-0"
        />
      </div>

      <DesktopNav />

      <div className="h-10 flex items-center gap-4">
        {actionSlot}
        <ThemeToggle />
        <Link to="/profile">
          <Avatar className="h-10 w-10 ring-2 ring-border cursor-pointer">
            <AvatarFallback>
              <User size={18} className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}
