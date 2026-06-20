export type CalendarState = {
  year: number
  month: number
}

export type CalendarAction =
  | { type: 'NEXT_MONTH' }
  | { type: 'PREV_MONTH' }
  | { type: 'NEXT_YEAR' }
  | { type: 'PREV_YEAR' }

export type UseCalendarReturn = {
  year: number
  month: number
  goToNextMonth: () => void
  goToPrevMonth: () => void
  goToNextYear: () => void
  goToPrevYear: () => void
}
