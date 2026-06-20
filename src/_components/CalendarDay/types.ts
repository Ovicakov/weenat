import type { CalendarEvent } from '@/_lib/useEvents/types'

export type Props = {
  day: number
  dateKey: string
  isToday: boolean
  events: CalendarEvent[]
  onDayClick: (dateKey: string) => void
  onDeleteEvent: (dateKey: string, id: string) => void
}
