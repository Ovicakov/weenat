import type { Props } from '@/_components/CalendarHeader/types'
import { formatMonthYear } from '@/_lib/dateUtils'

export function CalendarHeader({
  year,
  month,
  onPrevYear,
  onNextYear,
  onPrevMonth,
  onNextMonth,
}: Props) {
  const label = formatMonthYear(year, month)

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrevYear}
          aria-label="Année précédente"
          className="rounded px-2 py-1 text-gray-600 hover:bg-gray-100"
        >
          &#171;
        </button>
        <button
          type="button"
          onClick={onPrevMonth}
          aria-label="Mois précédent"
          className="rounded px-2 py-1 text-gray-600 hover:bg-gray-100"
        >
          &#8249;
        </button>
      </div>

      <h1 className="text-lg font-semibold capitalize text-gray-800">{label}</h1>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onNextMonth}
          aria-label="Mois suivant"
          className="rounded px-2 py-1 text-gray-600 hover:bg-gray-100"
        >
          &#8250;
        </button>
        <button
          type="button"
          onClick={onNextYear}
          aria-label="Année suivante"
          className="rounded px-2 py-1 text-gray-600 hover:bg-gray-100"
        >
          &#187;
        </button>
      </div>
    </div>
  )
}
