import { combineReducers } from 'redux'
import * as types from '../constants/actionTypes'

const initialState = () => {
  let poppers = {}
  for (let index = 1; index <= 100; index++) {
    poppers[index] = { id: index, color: '#ffffff' }
  }
  return poppers
}

export const poppers = (state = initialState(), action) => {
  switch (action.type) {
    case types.CHANGE_POPPER_COLOR:
      let newState = { ...state }
      newState[action.payload.id].color = action.payload.color
      return newState
    default:
      return state
  }
}

export default poppers
