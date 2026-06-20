import { act, renderHook } from '@testing-library/react'
import { useEvents } from '@/_lib/useEvents'

const mockStorage: Record<string, string> = {}

beforeEach(() => {
  Object.keys(mockStorage).forEach((key) => delete mockStorage[key])
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, value: string) => {
        mockStorage[key] = value
      },
      removeItem: (key: string) => {
        delete mockStorage[key]
      },
      clear: () => {
        Object.keys(mockStorage).forEach((key) => delete mockStorage[key])
      },
    },
    writable: true,
  })
})

describe('useEvents', () => {
  it('initializes with an empty map when storage is empty', () => {
    const { result } = renderHook(() => useEvents())

    expect(result.current.events).toEqual({})
  })

  it('loads persisted events from localStorage', () => {
    const stored = {
      '2024-01-05': [{ id: 'abc', title: 'Meeting', dateKey: '2024-01-05' }],
    }
    mockStorage['weenat-events'] = JSON.stringify(stored)

    const { result } = renderHook(() => useEvents())

    expect(result.current.events['2024-01-05']).toHaveLength(1)
    expect(result.current.events['2024-01-05']?.[0]?.title).toBe('Meeting')
  })

  it('addEvent adds a new event and persists it', () => {
    const { result } = renderHook(() => useEvents())

    act(() => result.current.addEvent('2024-06-15', 'Birthday'))

    expect(result.current.events['2024-06-15']).toHaveLength(1)
    expect(result.current.events['2024-06-15']?.[0]?.title).toBe('Birthday')
    expect(mockStorage['weenat-events']).toContain('Birthday')
  })

  it('addEvent appends to existing events on the same day', () => {
    const { result } = renderHook(() => useEvents())

    act(() => result.current.addEvent('2024-06-15', 'Event A'))
    act(() => result.current.addEvent('2024-06-15', 'Event B'))

    expect(result.current.events['2024-06-15']).toHaveLength(2)
  })

  it('deleteEvent removes the event by id', () => {
    const { result } = renderHook(() => useEvents())
    act(() => result.current.addEvent('2024-06-15', 'To delete'))
    const id = result.current.events['2024-06-15']?.[0]?.id ?? ''

    act(() => result.current.deleteEvent('2024-06-15', id))

    expect(result.current.events['2024-06-15']).toHaveLength(0)
  })

  it('deleteEvent on a dateKey with no events does not throw', () => {
    const { result } = renderHook(() => useEvents())

    expect(() => act(() => result.current.deleteEvent('2024-06-20', 'non-existent'))).not.toThrow()
  })

  it('deleteEvent does not affect events on other days', () => {
    const { result } = renderHook(() => useEvents())
    act(() => result.current.addEvent('2024-06-15', 'Keep'))
    act(() => result.current.addEvent('2024-06-16', 'Other'))
    const id = result.current.events['2024-06-15']?.[0]?.id ?? ''

    act(() => result.current.deleteEvent('2024-06-15', id))

    expect(result.current.events['2024-06-16']).toHaveLength(1)
  })

  it('handles corrupt localStorage data gracefully', () => {
    mockStorage['weenat-events'] = 'not-valid-json{'

    const { result } = renderHook(() => useEvents())

    expect(result.current.events).toEqual({})
  })

  it('does not throw when localStorage.setItem throws (quota error)', () => {
    const setItem = jest.fn(() => {
      throw new DOMException('QuotaExceededError')
    })
    Object.defineProperty(window, 'localStorage', {
      value: { ...window.localStorage, setItem, getItem: () => null },
      writable: true,
    })
    const { result } = renderHook(() => useEvents())

    expect(() => act(() => result.current.addEvent('2024-06-15', 'Test'))).not.toThrow()
  })
})
