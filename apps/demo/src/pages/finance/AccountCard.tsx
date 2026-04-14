import { QrCode, CirclePlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ACCOUNT } from './data'

const QUICK_ACTIONS = [
  { id: 'qr',   label: 'QR-код',     icon: <QrCode className="size-4" strokeWidth={1.5} /> },
  { id: 'auto', label: 'Пополнить',  icon: <CirclePlus className="size-4" strokeWidth={1.5} /> },
  { id: 'sbp',  label: 'СБП',        icon: <img src="/finance/logo-sbp.png" alt="СБП" className="size-5 object-contain rounded-full" /> },
]

export function AccountCard() {
  return (
    <div className="flex flex-col items-center gap-6 py-5">
      {/* Account header */}
      <div className="flex flex-col items-center gap-4 w-full">
        <Avatar className="size-11">
          <AvatarImage src="/finance/logo-tbank.png" alt="T-Bank" />
          <AvatarFallback className="bg-yellow-400 text-yellow-900 text-sm font-bold">Т</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center gap-2 w-full text-center">
          <p className="text-sm font-medium text-foreground">{ACCOUNT.title}</p>
          <p className="leading-none flex items-baseline gap-0.5">
            <span className="text-3xl font-bold text-foreground">10 350</span>
            <span className="text-xl font-normal text-foreground">,00</span>
            <span className="text-3xl font-bold text-foreground ml-1">₽</span>
          </p>
        </div>

        <Button variant="secondary" className="rounded-xl h-10 px-4 text-sm">
          Все счета
        </Button>
      </div>

      {/* Quick actions */}
      <div className="flex gap-6 items-start justify-center">
        {QUICK_ACTIONS.map(({ id, label, icon }) => (
          <div key={id} className="flex flex-col items-center gap-1.5">
            <Button variant="secondary" size="icon" className="size-11 rounded-xl">
              {icon}
            </Button>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
