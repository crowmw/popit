import { combineReducers } from 'redux'
import poppersReducer from './poppersReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
  poppers: poppersReducer,
  user: userReducer
})

export default reducer
