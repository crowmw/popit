import { combineReducers } from 'redux'
import poppersReducer from './poppersReducer'

const reducer = combineReducers({
  poppers: poppersReducer
})

export default reducer
