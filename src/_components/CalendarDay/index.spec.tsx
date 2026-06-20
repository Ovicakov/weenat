import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CalendarDay } from '@/_components/CalendarDay'
import type { CalendarEvent } from '@/_lib/useEvents/types'

const baseProps = {
  day: 15,
  dateKey: '2024-06-15',
  isToday: false,
  events: [] as CalendarEvent[],
  onDayClick: jest.fn(),
  onDeleteEvent: jest.fn(),
}

describe('CalendarDay', () => {
  it('renders the day number', () => {
    render(<CalendarDay {...baseProps} />)

    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('calls onDayClick with the dateKey when clicked', async () => {
    const onDayClick = jest.fn()
    render(<CalendarDay {...baseProps} onDayClick={onDayClick} />)

    await userEvent.click(screen.getByRole('button'))

    expect(onDayClick).toHaveBeenCalledWith('2024-06-15')
  })

  it('renders events as EventBadge components', () => {
    const events: CalendarEvent[] = [
      { id: '1', title: 'Team meeting', dateKey: '2024-06-15' },
      { id: '2', title: 'Lunch', dateKey: '2024-06-15' },
    ]
    render(<CalendarDay {...baseProps} events={events} />)

    expect(screen.getByText('Team meeting')).toBeInTheDocument()
    expect(screen.getByText('Lunch')).toBeInTheDocument()
  })

  it('calls onDeleteEvent when an event badge delete button is clicked', async () => {
    const onDeleteEvent = jest.fn()
    const events: CalendarEvent[] = [{ id: 'abc', title: 'Party', dateKey: '2024-06-15' }]
    render(<CalendarDay {...baseProps} events={events} onDeleteEvent={onDeleteEvent} />)

    await userEvent.click(screen.getByRole('button', { name: /Supprimer/ }))

    expect(onDeleteEvent).toHaveBeenCalledWith('2024-06-15', 'abc')
  })

  it("includes \"aujourd'hui\" in the aria-label when isToday is true", () => {
    render(<CalendarDay {...baseProps} isToday />)

    expect(screen.getByRole('button', { name: /aujourd'hui/ })).toBeInTheDocument()
  })
})
