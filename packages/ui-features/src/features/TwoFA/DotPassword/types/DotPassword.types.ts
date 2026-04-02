export type DotPasswordProps = {
  slotsCount: number
  defaultValue?: number | string
  title?: React.ReactNode
  subTitle?: React.ReactNode
  policy?: React.ReactNode
  onComplete?: (value: string) => Promise<void>
}
