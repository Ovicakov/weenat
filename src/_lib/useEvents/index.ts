'use client'

import { useState } from 'react'
import type { CalendarEvent, EventsMap, UseEventsReturn } from '@/_lib/useEvents/types'
import { STORAGE_KEY } from '@/_lib/useEvents/constants'

export type { CalendarEvent, EventsMap, UseEventsReturn }

function loadFromStorage(): EventsMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as EventsMap) : {}
  } catch {
    console.error(`[Local storage - ${STORAGE_KEY}] failed to load`)
    return {}
  }
}

function saveToStorage(events: EventsMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
  } catch {
    // silently ignore storage quota errors
  }
}

export function useEvents(): UseEventsReturn {
  const [events, setEvents] = useState<EventsMap>(() => {
    /* istanbul ignore next */
    if (typeof window === 'undefined') return {}
    return loadFromStorage()
  })

  function addEvent(dateKey: string, title: string) {
    const event: CalendarEvent = { id: crypto.randomUUID(), title, dateKey }
    setEvents((prev) => {
      const updated = { ...prev, [dateKey]: [...(prev[dateKey] ?? []), event] }
      saveToStorage(updated)
      return updated
    })
  }

  function deleteEvent(dateKey: string, id: string) {
    setEvents((prev) => {
      const filtered = (prev[dateKey] ?? []).filter((event) => event.id !== id)
      const updated = { ...prev, [dateKey]: filtered }
      saveToStorage(updated)
      return updated
    })
  }

  return { events, addEvent, deleteEvent }
}
