import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EventModal } from '@/_components/EventModal'

const baseProps = {
  open: true,
  dateKey: '2024-06-15',
  onConfirm: jest.fn(),
  onClose: jest.fn(),
}

describe('EventModal', () => {
  it('renders the input and action buttons when open', () => {
    render(<EventModal {...baseProps} />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Ajouter/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Annuler/ })).toBeInTheDocument()
  })

  it('renders nothing when closed', () => {
    render(<EventModal {...baseProps} open={false} />)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('the Ajouter button is disabled when the input is empty', () => {
    render(<EventModal {...baseProps} />)

    expect(screen.getByRole('button', { name: /Ajouter/ })).toBeDisabled()
  })

  it('the Ajouter button is enabled when the input has a value', async () => {
    render(<EventModal {...baseProps} />)

    await userEvent.type(screen.getByRole('textbox'), 'Birthday')

    expect(screen.getByRole('button', { name: /Ajouter/ })).not.toBeDisabled()
  })

  it('calls onConfirm with the trimmed title when Ajouter is clicked', async () => {
    const onConfirm = jest.fn()
    render(<EventModal {...baseProps} onConfirm={onConfirm} />)

    await userEvent.type(screen.getByRole('textbox'), '  Meeting  ')
    await userEvent.click(screen.getByRole('button', { name: /Ajouter/ }))

    expect(onConfirm).toHaveBeenCalledWith('Meeting')
  })

  it('calls onConfirm when Enter is pressed', async () => {
    const onConfirm = jest.fn()
    render(<EventModal {...baseProps} onConfirm={onConfirm} />)

    await userEvent.type(screen.getByRole('textbox'), 'Event{Enter}')

    expect(onConfirm).toHaveBeenCalledWith('Event')
  })

  it('calls onClose when Annuler is clicked', async () => {
    const onClose = jest.fn()
    render(<EventModal {...baseProps} onClose={onClose} />)

    await userEvent.click(screen.getByRole('button', { name: /Annuler/ }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not call onConfirm when input is blank and Enter is pressed', async () => {
    const onConfirm = jest.fn()
    render(<EventModal {...baseProps} onConfirm={onConfirm} />)

    await userEvent.type(screen.getByRole('textbox'), '   {Enter}')

    expect(onConfirm).not.toHaveBeenCalled()
  })
})
