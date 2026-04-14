import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MORE_PRODUCTS } from './data'

export function MoreProducts() {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-foreground">Вам может понравится</h2>
        <Button variant="link" className="text-foreground p-0 h-auto text-sm font-medium">Ещё</Button>
      </div>

      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-3 w-max">
          {MORE_PRODUCTS.map(item => (
            <div key={item.id} className="flex flex-col gap-2.5 flex-shrink-0 cursor-pointer">
              <div className="size-[130px] rounded-2xl overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5 w-[130px]">
                <p className="text-base font-medium text-foreground leading-6">{item.title}</p>
                <p className="text-xs font-normal text-[#858585] leading-4">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button variant="outline" className="h-[40px] gap-2 rounded-lg px-4 text-sm font-medium shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
          <Settings className="size-4" strokeWidth={1.5} />
          Настроить для себя
        </Button>
      </div>
    </div>
  )
}
