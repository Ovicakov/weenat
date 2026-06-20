'use client'

import { useReducer } from 'react'
import type { CalendarState, CalendarAction, UseCalendarReturn } from '@/_lib/useCalendar/types'

export type { UseCalendarReturn }

function reducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case 'NEXT_MONTH': {
      const month = (state.month + 1) % 12
      const year = state.month === 11 ? state.year + 1 : state.year
      return { year, month }
    }
    case 'PREV_MONTH': {
      const month = (state.month + 11) % 12
      const year = state.month === 0 ? state.year - 1 : state.year
      return { year, month }
    }
    case 'NEXT_YEAR':
      return { ...state, year: state.year + 1 }
    case 'PREV_YEAR':
      return { ...state, year: state.year - 1 }
  }
}

export function useCalendar(): UseCalendarReturn {
  const now = new Date()
  const [state, dispatch] = useReducer(reducer, {
    year: now.getFullYear(),
    month: now.getMonth(),
  })

  return {
    year: state.year,
    month: state.month,
    goToNextMonth: () => dispatch({ type: 'NEXT_MONTH' }),
    goToPrevMonth: () => dispatch({ type: 'PREV_MONTH' }),
    goToNextYear: () => dispatch({ type: 'NEXT_YEAR' }),
    goToPrevYear: () => dispatch({ type: 'PREV_YEAR' }),
  }
}
