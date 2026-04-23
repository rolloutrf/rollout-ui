import { useState } from 'react'

type UseBooleanReturn = [boolean, { on: () => void; off: () => void; toggle: () => void }]

export const useBoolean = (initialValue: boolean = false): UseBooleanReturn => {
  const [value, setValue] = useState<boolean>(initialValue)

  const setBoolean = {
    on: () => setValue(true),
    off: () => setValue(false),
    toggle: () => setValue((prev) => !prev),
  }

  return [value, setBoolean]
}
