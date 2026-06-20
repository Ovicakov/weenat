import { act, renderHook } from '@testing-library/react'
import { useCalendar } from '@/_lib/useCalendar'

describe('useCalendar', () => {
  it('initializes to the current month and year', () => {
    const now = new Date()
    const { result } = renderHook(() => useCalendar())

    expect(result.current.year).toBe(now.getFullYear())
    expect(result.current.month).toBe(now.getMonth())
  })

  it('goToNextMonth advances the month', () => {
    const { result } = renderHook(() => useCalendar())
    const initialMonth = result.current.month

    act(() => result.current.goToNextMonth())

    expect(result.current.month).toBe((initialMonth + 1) % 12)
  })

  it('goToNextMonth wraps from December to January and increments year', () => {
    const { result } = renderHook(() => useCalendar())
    const stepsToDecember = (12 - result.current.month - 1 + 12) % 12
    for (let i = 0; i < stepsToDecember; i++) {
      act(() => result.current.goToNextMonth())
    }
    const yearBeforeWrap = result.current.year

    act(() => result.current.goToNextMonth())

    expect(result.current.month).toBe(0)
    expect(result.current.year).toBe(yearBeforeWrap + 1)
  })

  it('goToPrevMonth goes back a month', () => {
    const { result } = renderHook(() => useCalendar())
    const initialMonth = result.current.month

    act(() => result.current.goToPrevMonth())

    expect(result.current.month).toBe((initialMonth + 11) % 12)
  })

  it('goToPrevMonth wraps from January to December and decrements year', () => {
    const { result } = renderHook(() => useCalendar())
    const stepsToJanuary = result.current.month
    for (let i = 0; i < stepsToJanuary; i++) {
      act(() => result.current.goToPrevMonth())
    }
    const yearBeforeWrap = result.current.year

    act(() => result.current.goToPrevMonth())

    expect(result.current.month).toBe(11)
    expect(result.current.year).toBe(yearBeforeWrap - 1)
  })

  it('goToNextYear increments the year', () => {
    const { result } = renderHook(() => useCalendar())
    const initialYear = result.current.year

    act(() => result.current.goToNextYear())

    expect(result.current.year).toBe(initialYear + 1)
  })

  it('goToPrevYear decrements the year', () => {
    const { result } = renderHook(() => useCalendar())
    const initialYear = result.current.year

    act(() => result.current.goToPrevYear())

    expect(result.current.year).toBe(initialYear - 1)
  })
})
