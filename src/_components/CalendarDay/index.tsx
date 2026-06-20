import type { Props } from '@/_components/CalendarDay/types'
import { EventBadge } from '@/_components/EventBadge'

export function CalendarDay({ day, dateKey, isToday, events, onDayClick, onDeleteEvent }: Props) {
  return (
    <button
      type="button"
      onClick={() => onDayClick(dateKey)}
      aria-label={`Jour ${day}${isToday ? ' (aujourd\'hui)' : ''}`}
      className={[
        'flex h-24 w-full flex-col items-start gap-1 overflow-hidden rounded-lg border p-1.5 text-left transition-colors hover:bg-blue-50',
        isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white',
      ].join(' ')}
    >
      <span
        className={[
          'flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium',
          isToday ? 'bg-blue-600 text-white' : 'text-gray-700',
        ].join(' ')}
      >
        {day}
      </span>
      <div className="flex w-full flex-col gap-0.5 overflow-hidden">
        {events.map((event) => (
          <EventBadge
            key={event.id}
            id={event.id}
            title={event.title}
            onDelete={(id) => onDeleteEvent(dateKey, id)}
          />
        ))}
      </div>
    </button>
  )
}
