const two = (n: number): string => `${n <= 9 ? '0' : ''}${n}`

/**
 * Форматирует миллисекунды в строку времени.
 * @param ms - длительность в миллисекундах (>= 0)
 * @param showLeadingZeros - если true, всегда показывает часы и минуты в двухразрядном виде ("00:01:05").
 *                           Если false, опускает старшие нули ("1:05" вместо "00:01:05").
 * @returns строка времени в формате HH:MM:SS или M:SS / H:MM:SS в зависимости от showLeadingZeros
 */
export const formatMsToTime = (ms: number, showLeadingZeros = true): string => {
  if (!Number.isFinite(ms) || ms < 0) throw new Error('ms must be a non-negative finite number')

  const totalSeconds = Math.floor(ms / 1000)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)

  if (showLeadingZeros) {
    return `${two(hours)}:${two(minutes)}:${two(seconds)}`
  }

  if (hours > 0) {
    return `${two(hours)}:${two(minutes)}:${two(seconds)}`
  }

  return minutes > 0 && showLeadingZeros ? `${two(minutes)}:${two(seconds)}` : two(seconds)
}
