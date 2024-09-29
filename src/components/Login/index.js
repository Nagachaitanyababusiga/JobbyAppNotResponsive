import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', displayFailure: false, errorMsg: ''}

  chageUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  reqsuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    // console.log(Cookies.get('jwt_token'))
    history.replace('/')
  }

  reqfailure = errorMsg => {
    this.setState({displayFailure: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.reqsuccess(data.jwt_token)
    } else {
      this.reqfailure(data.error_msg)
    }
  }

  render() {
    const {password, username, errorMsg, displayFailure} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-background">
        <form className="login-card" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="login-inputer">
            <label htmlFor="nameinput" className="login-label">
              Username
            </label>
            <input
              id="nameinput"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={this.chageUsername}
            />
            <label htmlFor="psdinput" className="login-label">
              Password
            </label>
            <input
              id="psdinput"
              className="login-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={this.changePassword}
            />
            <button type="submit" className="login-buttoner">
              Login
            </button>
            {displayFailure && <p className="login-err-msg">{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
