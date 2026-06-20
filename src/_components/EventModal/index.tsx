'use client'

import { ChangeEvent, useState, KeyboardEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import type { Props } from '@/_components/EventModal/types'

export function EventModal({ open, dateKey, onConfirm, onClose }: Props) {
  const [title, setTitle] = useState('')

  function handleConfirm() {
    const trimmed = title.trim()
    if (!trimmed) return
    onConfirm(trimmed)
    setTitle('')
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') handleConfirm()
  }

  function handleClose() {
    setTitle('')
    onClose()
  }

  const [year, monthIndex, day] = dateKey.split('-').map(Number)
  /* istanbul ignore next */
  const label = new Date(year ?? 0, (monthIndex ?? 1) - 1, day ?? 1).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl"
          aria-describedby={undefined}
        >
          <Dialog.Title className="mb-4 text-lg font-semibold capitalize">{label}</Dialog.Title>
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Titre de l'événement"
            className="mb-4 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Titre de l'événement"
          />
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
              >
                Annuler
              </button>
            </Dialog.Close>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!title.trim()}
              className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Ajouter
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
