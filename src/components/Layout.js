import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import { getPoppersArray } from '../selectors/poppersSelector'
import { setInitData, changePopperColor, popperClick } from '../actions/poppersActions'
import UserForm from './UserForm'
import './style.css'

const socket = io.connect('http://localhost:3000')

class Layout extends Component {
  constructor(props) {
    super(props)
    console.dir(socket)
    //dispatch load initial data socket

    socket.on('init-data', data => {
      console.dir(data)
      this.props.setInitData(data)
    })

    socket.on('popper-clicked', res => {
      console.dir(res)
      this.props.changePopperColor(res.id, res.color)
    })

    this.handlePopperClick = this.handlePopperClick.bind(this)
  }

  handlePopperClick = popper => {
    let { popperClick, user } = this.props
    console.log('POP!', popper)
    popperClick(socket, popper._id, user)
  }

  render() {
    let { poppers, user } = this.props

    return (
      <div className="layout">
        <div className="mesh">
          {poppers &&
            poppers.map(popper => (
              <FloatingActionButton
                key={popper._id}
                backgroundColor={popper.color}
                className="popper"
                onTouchTap={() => this.handlePopperClick(popper)}
              />
            ))}
        </div>
        {!user.name && <UserForm />}
      </div>
    )
  }
}

const mapState = state => {
  return {
    poppers: getPoppersArray(state),
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators(
    {
      changePopperColor,
      popperClick,
      setInitData
    },
    dispatch
  )
}

export default connect(mapState, mapDispatch)(Layout)
