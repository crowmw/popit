import * as types from '../constants/actionTypes'

export const updateUser = (name, color) => {
  return {
    type: types.UPDATE_USER,
    payload: { name, color }
  }
}
