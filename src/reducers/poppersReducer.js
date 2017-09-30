import { combineReducers } from 'redux'
import * as types from '../constants/actionTypes'

const initialState = {
  poppers: {}
}

export const poppers = (state = initialState.poppers, action) => {
  switch (action.type) {
    case types.SET_INIT_DATA:
      return { ...action.payload.data }
    case types.CHANGE_POPPER_COLOR:
      let newState = { ...state }
      newState[action.payload.id].color = action.payload.color
      return newState
    default:
      return state
  }
}

export default poppers
