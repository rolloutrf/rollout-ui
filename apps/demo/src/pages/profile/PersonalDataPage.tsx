import { ArrowLeft, ChevronRight, Package } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@rollout/ui-kit'

import { USER } from './data'

import { SearchInput } from '@/components/ui/SearchInput'

const GENDERS = ['Мужской', 'Женский']
const COUNTRIES = ['Россия', 'Казахстан', 'Беларусь', 'Армения']
const LANGUAGES = ['Русский', 'English']
const CURRENCIES = ['Российский рубль', 'US Dollar', 'Euro']
const TIMEZONES = [
  '(UTC+02:00) Калининград',
  '(UTC+03:00) Москва',
  '(UTC+04:00) Самара',
  '(UTC+05:00) Екатеринбург',
  '(UTC+07:00) Новосибирск',
  '(UTC+10:00) Владивосток',
]

export function PersonalDataPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: USER.fullName,
    address: 'Москва, Тверская, 12',
    birthDate: '14.05.1992',
    gender: 'Женский',
    email: USER.email,
    country: 'Россия',
    language: 'Русский',
    currency: 'Российский рубль',
    timezone: '(UTC+03:00) Москва',
  })

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="w-full">
      <div className="mx-auto flex max-w-[576px] flex-col gap-7 pt-20 pb-8">
        {/* NavBar (Figma 221:4087): LeftContent ArrowLeft + .NavBarContent Title + .RightContent Action-1 */}
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
          <h1 className="flex-1 text-lg font-semibold leading-7 text-foreground">Личные данные</h1>
          <div className="size-10 shrink-0 rounded-xl" aria-hidden="true" />
        </div>

        {/* Form */}
        <div className="flex w-full flex-col gap-7">
          <Field>
            <FieldLabel className="text-sm font-medium text-foreground">ФИО</FieldLabel>
            <Input
              className="h-10 rounded-xl px-3 text-sm"
              placeholder="Фамилия Имя Отчество"
              value={form.fullName}
              onChange={(e) => set('fullName', e.target.value)}
            />
            <FieldDescription className="text-sm font-normal text-muted-foreground">
              Если отчества нет, оставьте поле пустым
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium text-foreground">Адрес</FieldLabel>
            <SearchInput value={form.address} onChange={(v) => set('address', v)} placeholder="Город, улица, дом" />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium text-foreground">Дата рождения</FieldLabel>
            <Input
              className="h-10 rounded-xl px-3 text-sm"
              placeholder="00.00.0000"
              value={form.birthDate}
              onChange={(e) => set('birthDate', e.target.value)}
              inputMode="numeric"
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium text-foreground">Пол</FieldLabel>
            <Select value={form.gender} onValueChange={(v) => set('gender', v as string)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GENDERS.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium text-foreground">Эл. почта</FieldLabel>
            <Input
              className="h-10 rounded-xl px-3 text-sm"
              placeholder="usermane@mail.com"
              type="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium text-foreground">Страна</FieldLabel>
            <Select value={form.country} onValueChange={(v) => set('country', v as string)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium text-foreground">Язык</FieldLabel>
            <Select value={form.language} onValueChange={(v) => set('language', v as string)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium text-foreground">Валюта</FieldLabel>
            <Select value={form.currency} onValueChange={(v) => set('currency', v as string)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel className="text-sm font-medium text-foreground">Часовой пояс</FieldLabel>
            <Select value={form.timezone} onValueChange={(v) => set('timezone', v as string)}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIMEZONES.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        {/* Item: Данные для таможни */}
        <button
          type="button"
          className="flex w-full items-center gap-4 overflow-hidden rounded-xl px-3 py-4 text-left transition-colors hover:bg-muted/40"
          onClick={() => {
            /* mock */
          }}
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
            <Package className="size-4 text-foreground" strokeWidth={1.5} />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-sm font-medium leading-4 text-foreground">Данные для таможни</p>
            <p className="text-sm font-normal text-muted-foreground">Для оформления посылок</p>
          </div>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
