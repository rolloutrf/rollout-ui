import { TabBar } from '@/components/navigation/TabBar'
import { AssistantFAB } from '@/components/navigation/AssistantFAB'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="w-full h-screen bg-background">
      {/* pb-tabbar = 49px + safe-area on mobile, overridden to 0 on desktop */}
      <div className="max-w-[1200px] mx-auto h-full flex flex-col px-4 pb-tabbar md:pb-0">
        {children}
      </div>
      <TabBar />
      <AssistantFAB />
    </div>
  )
}
