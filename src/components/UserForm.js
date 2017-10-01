import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from '../selectors/userSelector'
import { updateUser } from '../actions/userActions'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import randomHexColor from 'random-hex-color'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import './style.css'

class UserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      color: randomHexColor(),
      opened: false
    }
    this.handleOnNameChange = this.handleOnNameChange.bind(this)
  }

  handleOnNameChange = e => {
    this.setState({
      name: e.currentTarget.value
    })
  }

  handleColorChange = color => {
    this.setState({
      color,
      opened: false
    })
  }

  handleClick = () => {
    let { name, color } = this.state
    this.props.updateUser(name, color)
  }

  handleOpen = e => {
    this.setState({ anchorEl: e.currentTarget, opened: true })
  }

  handleRequestClose = () => {
    this.setState({
      opened: false
    })
  }

  render() {
    let { handleOnNameChange, updateUser } = this.props
    let { name, color, opened, anchorEl } = this.state

    let colours = []
    for (let i = 0; i <= 5; i++) {
      colours.push(randomHexColor())
    }

    return (
      <div className="blured">
        <Paper className="userForm">
          <div className="textField">
            <TextField value={name} onChange={e => this.handleOnNameChange(e)} />
            <FloatingActionButton backgroundColor={color} onTouchTap={e => this.handleOpen(e)} />
            <Popover
              open={opened}
              anchorEl={anchorEl}
              anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
              targetOrigin={{ horizontal: 'middle', vertical: 'center' }}
              onRequestClose={this.handleRequestClose}
            >
              <Menu>
                {colours.map((color, index) => (
                  <MenuItem>
                    <FloatingActionButton
                      key={index}
                      backgroundColor={color}
                      onTouchTap={() => this.handleColorChange(color)}
                    />
                  </MenuItem>
                ))}
              </Menu>
            </Popover>
          </div>
          <RaisedButton
            primary={true}
            label="Start popping!"
            onTouchTap={() => this.handleClick()}
          />
        </Paper>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: getUser(state)
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators(
    {
      updateUser
    },
    dispatch
  )
}

export default connect(mapState, mapDispatch)(UserForm)
