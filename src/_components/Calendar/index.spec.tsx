import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Calendar } from '@/_components/Calendar'

beforeEach(() => {
  localStorage.clear()
})

describe('Calendar', () => {
  it('renders the weekday headers', () => {
    render(<Calendar />)

    expect(screen.getByText('Lun')).toBeInTheDocument()
    expect(screen.getByText('Dim')).toBeInTheDocument()
  })

  it('renders navigation buttons', () => {
    render(<Calendar />)

    expect(screen.getByRole('button', { name: /Mois précédent/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Mois suivant/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Année précédente/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Année suivante/ })).toBeInTheDocument()
  })

  it('opens the modal when a day is clicked', async () => {
    render(<Calendar />)

    await userEvent.click(screen.getAllByRole('button', { name: /^Jour \d+/ })[0]!)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('navigates to next month when next-month is clicked', async () => {
    render(<Calendar />)
    const heading = screen.getByRole('heading', { level: 1 })
    const initialText = heading.textContent

    await userEvent.click(screen.getByRole('button', { name: /Mois suivant/ }))

    expect(heading.textContent).not.toBe(initialText)
  })

  it('navigates to previous month when prev-month is clicked', async () => {
    render(<Calendar />)
    const heading = screen.getByRole('heading', { level: 1 })
    const initialText = heading.textContent

    await userEvent.click(screen.getByRole('button', { name: /Mois précédent/ }))

    expect(heading.textContent).not.toBe(initialText)
  })

  it('adds an event and displays it on the day after confirming in the modal', async () => {
    render(<Calendar />)
    await userEvent.click(screen.getAllByRole('button', { name: /^Jour \d+/ })[0]!)
    await userEvent.type(screen.getByRole('textbox'), 'Test event')

    await userEvent.click(screen.getByRole('button', { name: /Ajouter/ }))

    expect(screen.getByText('Test event')).toBeInTheDocument()
  })

  it('closes the modal when Annuler is clicked', async () => {
    render(<Calendar />)
    await userEvent.click(screen.getAllByRole('button', { name: /^Jour \d+/ })[0]!)

    await userEvent.click(screen.getByRole('button', { name: /Annuler/ }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('navigates to next year when next-year is clicked', async () => {
    render(<Calendar />)
    const heading = screen.getByRole('heading', { level: 1 })
    const initialText = heading.textContent

    await userEvent.click(screen.getByRole('button', { name: /Année suivante/ }))

    expect(heading.textContent).not.toBe(initialText)
  })

  it('navigates to previous year when prev-year is clicked', async () => {
    render(<Calendar />)
    const heading = screen.getByRole('heading', { level: 1 })
    const initialText = heading.textContent

    await userEvent.click(screen.getByRole('button', { name: /Année précédente/ }))

    expect(heading.textContent).not.toBe(initialText)
  })
})
