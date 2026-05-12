import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import { ArrowLeft, BarChart3, CalendarDays, ChevronDown, ChevronLeft, PieChart, Search } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@rollout/ui-kit'

import {
  EXPENSE_BREAKDOWN,
  EXPENSE_TOTAL,
  INCOME_BREAKDOWN,
  INCOME_TOTAL,
  formatRub,
  type ExpenseCategory,
} from './data'

import type { DateRange } from 'react-day-picker'

type Mode = 'expense' | 'income'
type ChartView = 'pie' | 'bar'

const PIE_GAP_DEG = 7
const PIE_CORNER_RADIUS = 6

export function AnalyticsPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('expense')
  const [chart, setChart] = useState<ChartView>('pie')
  const [range, setRange] = useState<DateRange | undefined>()

  const periodLabel =
    range?.from && range?.to
      ? `${format(range.from, 'd MMM', { locale: ru })} – ${format(range.to, 'd MMM', { locale: ru })}`
      : range?.from
        ? format(range.from, 'd MMM', { locale: ru })
        : 'Период'

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-[576px] flex-col gap-7 pt-20 pb-8">
        {/* NavBar */}
        <div className="flex w-full items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-10 shrink-0 rounded-xl"
            aria-label="Назад"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="size-5 text-foreground" strokeWidth={1.75} />
          </Button>
          <h1 className="flex-1 text-lg font-semibold leading-7 text-foreground">Аналитика финансов</h1>
          <Button variant="ghost" size="icon" className="size-10 shrink-0 rounded-xl" aria-label="Поиск">
            <Search className="size-5 text-foreground" strokeWidth={1.75} />
          </Button>
        </div>

        {/* Mode tabs */}
        <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
          <TabsList>
            <TabsTrigger value="expense">Расходы</TabsTrigger>
            <TabsTrigger value="income">Доходы</TabsTrigger>
          </TabsList>

          {/* Filter chips */}
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 scrollbar-hide">
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="flex h-10 shrink-0 items-center gap-2 rounded-2xl border border-border bg-background px-4 text-sm font-medium text-foreground"
                  >
                    <CalendarDays className="size-4 shrink-0 translate-y-px" strokeWidth={1.75} />
                    <span className="leading-none">{periodLabel}</span>
                  </button>
                }
              />
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar mode="range" numberOfMonths={1} selected={range} onSelect={setRange} locale={ru} />
              </PopoverContent>
            </Popover>
            <FilterChip muted>
              Счета и карты
              <ChevronDown className="size-4" strokeWidth={1.75} />
            </FilterChip>
            <FilterChip>Неделя</FilterChip>
            <FilterChip>Месяц</FilterChip>
          </div>

          <TabsContent value="expense" className="flex flex-col gap-7">
            <BreakdownView
              data={EXPENSE_BREAKDOWN}
              total={EXPENSE_TOTAL}
              caption="Расходы за декабрь"
              chart={chart}
              setChart={setChart}
            />
          </TabsContent>

          <TabsContent value="income" className="flex flex-col gap-7">
            <BreakdownView
              data={INCOME_BREAKDOWN}
              total={INCOME_TOTAL}
              caption="Доходы за декабрь"
              chart={chart}
              setChart={setChart}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BreakdownView({
  data,
  total,
  caption,
  chart,
  setChart,
}: {
  data: ExpenseCategory[]
  total: number
  caption: string
  chart: ChartView
  setChart: (v: ChartView) => void
}) {
  return (
    <>
      {/* Chart view toggle */}
      <div className="mt-4 flex w-full items-center justify-center gap-2">
        <button
          type="button"
          aria-label="Круговая диаграмма"
          aria-pressed={chart === 'pie'}
          onClick={() => setChart('pie')}
          className={
            'flex size-10 items-center justify-center rounded-xl border border-border ' +
            (chart === 'pie' ? 'bg-muted' : 'bg-background')
          }
        >
          <PieChart className="size-5 text-foreground" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          aria-label="Гистограмма"
          aria-pressed={chart === 'bar'}
          onClick={() => setChart('bar')}
          className={
            'flex size-10 items-center justify-center rounded-xl border border-border ' +
            (chart === 'bar' ? 'bg-muted' : 'bg-background')
          }
        >
          <BarChart3 className="size-5 text-foreground" strokeWidth={1.75} />
        </button>
      </div>

      {/* Chart header + body */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-normal leading-5 text-muted-foreground">{caption}</p>
          <p className="text-2xl font-semibold leading-8 text-foreground">{formatRub(total)}</p>
        </div>
        <div className="relative flex h-[240px] w-full items-center justify-center">
          <button
            type="button"
            aria-label="Предыдущий период"
            className="absolute left-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-xl text-muted-foreground"
          >
            <ChevronLeft className="size-6" strokeWidth={1.75} />
          </button>
          {chart === 'pie' ? <Donut data={data} total={total} /> : <BarChartView data={data} />}
        </div>
      </div>

      {/* Categories */}
      <section className="flex w-full flex-col gap-2">
        <h2 className="text-base font-semibold text-foreground">Категории</h2>
        <ul className="flex w-full flex-col">
          {data.map((cat) => (
            <li key={cat.title} className="flex w-full items-center gap-3 py-3">
              <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${cat.iconBg}`}>
                <cat.Icon className={`size-5 ${cat.iconColor}`} strokeWidth={1.75} />
              </div>
              <div className="flex flex-1 min-w-0 flex-col gap-0.5">
                <p className="text-sm font-medium leading-5 text-foreground">{cat.title}</p>
                <p className="text-sm font-normal leading-5 text-muted-foreground">{cat.ops} операций</p>
              </div>
              <p className="shrink-0 text-sm font-normal leading-5 text-muted-foreground">{formatRub(cat.amount)}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

function FilterChip({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <button
      type="button"
      className={
        'flex h-10 shrink-0 items-center gap-2 rounded-2xl border border-border bg-background px-4 text-sm font-medium ' +
        (muted ? 'text-muted-foreground' : 'text-foreground')
      }
    >
      {children}
    </button>
  )
}

function BarChartView({ data }: { data: ExpenseCategory[] }) {
  const max = Math.max(...data.map((c) => c.amount))
  return (
    <div className="mx-auto flex h-full w-1/2 flex-col justify-end">
      <div className="flex h-[200px] items-end gap-2">
        {data.map((cat) => (
          <div key={cat.title} className="flex h-full flex-1 items-end justify-center">
            <div
              className={`w-3/4 rounded-t-lg border-[1.5px] ${cat.borderClass} ${cat.chartBg}`}
              style={{ height: `${(cat.amount / max) * 100}%` }}
              aria-label={`${cat.title}: ${formatRub(cat.amount)}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        {data.map((cat) => (
          <span
            key={cat.title}
            className="line-clamp-2 flex-1 text-center text-[10px] font-normal leading-3 text-muted-foreground"
          >
            {cat.title}
          </span>
        ))}
      </div>
    </div>
  )
}

function Donut({ data, total }: { data: ExpenseCategory[]; total: number }) {
  const rMid = 80
  const halfThickness = 11
  const rc = PIE_CORNER_RADIUS
  let cursorDeg = 0
  const segments = data.map((cat) => {
    const segDeg = (cat.amount / total) * 360
    const a1 = cursorDeg + PIE_GAP_DEG / 2
    const a2 = cursorDeg + segDeg - PIE_GAP_DEG / 2
    cursorDeg += segDeg
    return {
      fillVar: `var(--${cat.bgClass.replace('bg-', '')})`,
      title: cat.title,
      d: arcSegmentPath(a1, a2, rMid, halfThickness, rc),
    }
  })

  return (
    <svg viewBox="0 0 200 200" className="size-[240px]">
      {segments.map((s) => (
        <path
          key={s.title}
          d={s.d}
          style={{ fill: s.fillVar, fillOpacity: 0.6, stroke: s.fillVar, strokeWidth: 1.5 }}
        />
      ))}
    </svg>
  )
}

function arcSegmentPath(a1: number, a2: number, rMid: number, h: number, rc: number): string {
  // 0deg = top, clockwise. Returns a filled-ring-segment path with corner radius `rc` at all 4 corners.
  const cx = 100
  const cy = 100
  const rOut = rMid + h
  const rIn = rMid - h
  const polar = (deg: number, r: number): [number, number] => {
    const rad = ((deg - 90) * Math.PI) / 180
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
  }
  const dαOut = (rc / rOut) * (180 / Math.PI)
  const dαIn = (rc / rIn) * (180 / Math.PI)
  const [oAx, oAy] = polar(a1 + dαOut, rOut)
  const [oBx, oBy] = polar(a2 - dαOut, rOut)
  const [iBx, iBy] = polar(a2 - dαIn, rIn)
  const [iAx, iAy] = polar(a1 + dαIn, rIn)
  const [oBsx, oBsy] = polar(a2, rOut - rc)
  const [iBsx, iBsy] = polar(a2, rIn + rc)
  const [iAsx, iAsy] = polar(a1, rIn + rc)
  const [oAsx, oAsy] = polar(a1, rOut - rc)
  const largeOut = a2 - a1 - 2 * dαOut > 180 ? 1 : 0
  const largeIn = a2 - a1 - 2 * dαIn > 180 ? 1 : 0
  return [
    `M ${oAx} ${oAy}`,
    `A ${rOut} ${rOut} 0 ${largeOut} 1 ${oBx} ${oBy}`,
    `A ${rc} ${rc} 0 0 1 ${oBsx} ${oBsy}`,
    `L ${iBsx} ${iBsy}`,
    `A ${rc} ${rc} 0 0 1 ${iBx} ${iBy}`,
    `A ${rIn} ${rIn} 0 ${largeIn} 0 ${iAx} ${iAy}`,
    `A ${rc} ${rc} 0 0 1 ${iAsx} ${iAsy}`,
    `L ${oAsx} ${oAsy}`,
    `A ${rc} ${rc} 0 0 1 ${oAx} ${oAy}`,
    'Z',
  ].join(' ')
}
