import React, { Component } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
import { getPoppersArray } from '../selectors/poppersSelector'
import { changePopperColor, popperClick } from '../actions/poppersActions'
import './style.css'

const socket = io.connect('http://localhost:3000')

class Layout extends Component {
  constructor(props) {
    super(props)
    console.dir(socket)
    //dispatch load initial data socket
    socket.on('popper-clicked', res => {
      console.dir(res)
      this.props.changePopperColor(res.id, res.color)
    })

    this.handlePopperClick = this.handlePopperClick.bind(this)
  }

  handlePopperClick = popper => {
    let { popperClick } = this.props
    console.log('POP!', popper)
    popperClick(socket, popper.id)
  }

  render() {
    let { poppers } = this.props

    return (
      <div className="mesh">
        {poppers &&
          poppers.map(popper => (
            <FloatingActionButton
              key={popper.id}
              backgroundColor={popper.color}
              className="popper"
              onTouchTap={() => this.handlePopperClick(popper)}
            />
          ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    poppers: getPoppersArray(state)
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators(
    {
      changePopperColor,
      popperClick
    },
    dispatch
  )
}

export default connect(mapState, mapDispatch)(Layout)
