import { AssistantFAB } from '@/components/navigation/AssistantFAB'
import { TabBar } from '@/components/navigation/TabBar'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="w-full h-screen bg-background">
      <div className="max-w-300 mx-auto h-full flex flex-col px-4 pb-tabbar md:pb-0">{children}</div>
      <TabBar />
      <AssistantFAB />
    </div>
  )
}
