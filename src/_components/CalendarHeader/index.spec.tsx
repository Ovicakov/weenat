import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CalendarHeader } from '@/_components/CalendarHeader'

const defaultProps = {
  year: 2024,
  month: 5,
  onPrevYear: jest.fn(),
  onNextYear: jest.fn(),
  onPrevMonth: jest.fn(),
  onNextMonth: jest.fn(),
}

describe('CalendarHeader', () => {
  it('displays the formatted month and year', () => {
    render(<CalendarHeader {...defaultProps} />)

    expect(screen.getByText(/2024/)).toBeInTheDocument()
  })

  it('calls onPrevYear when the prev-year button is clicked', async () => {
    const onPrevYear = jest.fn()
    render(<CalendarHeader {...defaultProps} onPrevYear={onPrevYear} />)

    await userEvent.click(screen.getByRole('button', { name: /Année précédente/ }))

    expect(onPrevYear).toHaveBeenCalledTimes(1)
  })

  it('calls onNextYear when the next-year button is clicked', async () => {
    const onNextYear = jest.fn()
    render(<CalendarHeader {...defaultProps} onNextYear={onNextYear} />)

    await userEvent.click(screen.getByRole('button', { name: /Année suivante/ }))

    expect(onNextYear).toHaveBeenCalledTimes(1)
  })

  it('calls onPrevMonth when the prev-month button is clicked', async () => {
    const onPrevMonth = jest.fn()
    render(<CalendarHeader {...defaultProps} onPrevMonth={onPrevMonth} />)

    await userEvent.click(screen.getByRole('button', { name: /Mois précédent/ }))

    expect(onPrevMonth).toHaveBeenCalledTimes(1)
  })

  it('calls onNextMonth when the next-month button is clicked', async () => {
    const onNextMonth = jest.fn()
    render(<CalendarHeader {...defaultProps} onNextMonth={onNextMonth} />)

    await userEvent.click(screen.getByRole('button', { name: /Mois suivant/ }))

    expect(onNextMonth).toHaveBeenCalledTimes(1)
  })
})
