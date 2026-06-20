import {
  getDaysInMonth,
  getFirstDayOfWeek,
  toDateKey,
  formatMonthYear,
  isToday,
} from '@/_lib/dateUtils'

describe('getDaysInMonth', () => {
  it('returns 31 for January', () => {
    expect(getDaysInMonth(2024, 0)).toBe(31)
  })

  it('returns 28 for February in a non-leap year', () => {
    expect(getDaysInMonth(2023, 1)).toBe(28)
  })

  it('returns 29 for February in a leap year', () => {
    expect(getDaysInMonth(2024, 1)).toBe(29)
  })

  it('returns 30 for April', () => {
    expect(getDaysInMonth(2024, 3)).toBe(30)
  })
})

describe('getFirstDayOfWeek', () => {
  it('returns 0 (Monday) for 2024-01-01', () => {
    expect(getFirstDayOfWeek(2024, 0)).toBe(0)
  })

  it('returns 3 (Thursday) for 2024-02-01', () => {
    expect(getFirstDayOfWeek(2024, 1)).toBe(3)
  })

  it('returns 6 (Sunday) for 2025-06-01', () => {
    expect(getFirstDayOfWeek(2025, 5)).toBe(6)
  })
})

describe('toDateKey', () => {
  it('pads month and day with leading zeros', () => {
    expect(toDateKey(2024, 0, 5)).toBe('2024-01-05')
  })

  it('handles double-digit day and month', () => {
    expect(toDateKey(2024, 11, 25)).toBe('2024-12-25')
  })
})

describe('formatMonthYear', () => {
  it('returns a non-empty string', () => {
    const result = formatMonthYear(2024, 0)

    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('includes the year', () => {
    expect(formatMonthYear(2024, 5)).toContain('2024')
  })
})

describe('isToday', () => {
  it('returns true for the current date', () => {
    const now = new Date()

    expect(isToday(now.getFullYear(), now.getMonth(), now.getDate())).toBe(true)
  })

  it('returns false for a different date', () => {
    expect(isToday(2000, 0, 1)).toBe(false)
  })
})
