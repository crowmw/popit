import * as types from '../constants/actionTypes'

export const setInitData = data => {
  return {
    type: types.SET_INIT_DATA,
    payload: { data }
  }
}

export const popperClick = (socket, id) => {
  return dispatch => {
    console.log('DISPATCH!')
    let postData = {
      id,
      color: '#ff0000'
    }
    socket.emit('popper-click', postData)
  }
}

export const changePopperColor = (id, color) => {
  console.log('ACTION!')
  return {
    type: types.CHANGE_POPPER_COLOR,
    payload: { id, color }
  }
}
