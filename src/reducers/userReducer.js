import { combineReducers } from 'redux'
import * as types from '../constants/actionTypes'

const initialState = {
  name: '',
  color: '#ffffff'
}

export const name = (state = initialState.name, action) => {
  switch (action.type) {
    case types.UPDATE_USER:
      return action.payload.name
    default:
      return state
  }
}

export const color = (state = initialState.color, action) => {
  switch (action.type) {
    case types.UPDATE_USER:
      return action.payload.color
    default:
      return state
  }
}

const userReducer = combineReducers({
  name,
  color
})

export default userReducer
