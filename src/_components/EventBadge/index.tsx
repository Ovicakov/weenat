import type { Props } from '@/_components/EventBadge/types'

export function EventBadge({ id, title, onDelete }: Props) {
  return (
    <span className="flex items-center gap-1 rounded bg-blue-100 px-1.5 py-0.5 text-xs text-blue-800">
      <span className="truncate">{title}</span>
      <button
        type="button"
        aria-label={`Supprimer "${title}"`}
        className="shrink-0 text-blue-400 hover:text-blue-700"
        onClick={(event) => {
          event.stopPropagation()
          onDelete(id)
        }}
      >
        ×
      </button>
    </span>
  )
}
