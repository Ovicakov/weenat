export type CalendarEvent = {
  id: string
  title: string
  dateKey: string
}

export type EventsMap = Record<string, CalendarEvent[]>

export type UseEventsReturn = {
  events: EventsMap
  addEvent: (dateKey: string, title: string) => void
  deleteEvent: (dateKey: string, id: string) => void
}
