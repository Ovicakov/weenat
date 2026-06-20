import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EventBadge } from '@/_components/EventBadge'

describe('EventBadge', () => {
  it('renders the event title', () => {
    render(<EventBadge id="1" title="Birthday" onDelete={jest.fn()} />)

    expect(screen.getByText('Birthday')).toBeInTheDocument()
  })

  it('renders a delete button with an accessible label', () => {
    render(<EventBadge id="1" title="Birthday" onDelete={jest.fn()} />)

    expect(screen.getByRole('button', { name: /Supprimer "Birthday"/ })).toBeInTheDocument()
  })

  it('calls onDelete with the event id when delete button is clicked', async () => {
    const onDelete = jest.fn()
    render(<EventBadge id="abc" title="Meeting" onDelete={onDelete} />)

    await userEvent.click(screen.getByRole('button', { name: /Supprimer/ }))

    expect(onDelete).toHaveBeenCalledWith('abc')
  })
})
