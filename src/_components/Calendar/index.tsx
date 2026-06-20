'use client'

import { useState } from 'react'
import { useCalendar } from '@/_lib/useCalendar'
import { useEvents } from '@/_lib/useEvents'
import { getDaysInMonth, getFirstDayOfWeek, toDateKey } from '@/_lib/dateUtils'
import { CalendarHeader } from '@/_components/CalendarHeader'
import { CalendarDay } from '@/_components/CalendarDay'
import { EventModal } from '@/_components/EventModal'
import { WEEKDAYS } from '@/_components/Calendar/constants'

export function Calendar() {
  const { year, month, goToNextMonth, goToPrevMonth, goToNextYear, goToPrevYear } = useCalendar()
  const { events, addEvent, deleteEvent } = useEvents()
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfWeek(year, month)
  const today = new Date()

  const cells: Array<{ day: number; dateKey: string } | null> = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      dateKey: toDateKey(year, month, i + 1),
    })),
  ]

  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  function handleConfirm(title: string) {
    /* istanbul ignore next */
    if (!selectedDay) return
    addEvent(selectedDay, title)
    setSelectedDay(null)
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <CalendarHeader
        year={year}
        month={month}
        onPrevYear={goToPrevYear}
        onNextYear={goToNextYear}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
      />

      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            className="py-1 text-center text-xs font-medium uppercase text-gray-400"
          >
            {weekday}
          </div>
        ))}

        {cells.map((cell, index) =>
          cell ? (
            <CalendarDay
              key={cell.dateKey}
              day={cell.day}
              dateKey={cell.dateKey}
              isToday={
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === cell.day
              }
              events={events[cell.dateKey] ?? []}
              onDayClick={setSelectedDay}
              onDeleteEvent={deleteEvent}
            />
          ) : (
            <div key={`empty-${index}`} className="h-24 rounded-lg border border-transparent" />
          ),
        )}
      </div>

      <EventModal
        open={selectedDay !== null}
        dateKey={selectedDay ?? ''}
        onConfirm={handleConfirm}
        onClose={() => setSelectedDay(null)}
      />
    </div>
  )
}
