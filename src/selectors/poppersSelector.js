import { createSelector } from 'reselect'
export const getPoppers = state => state.poppers

export const getPoppersArray = createSelector(
  getPoppers,
  poppers => poppers && Object.keys(poppers).map(key => poppers[key])
)
