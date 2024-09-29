import {Redirect, Route} from 'react-router-dom'
import Cookie from 'js-cookie'

const AuthRoute = props => {
  const token = Cookie.get('jwt_token')
  if (token === undefined) {
    console.log()
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default AuthRoute
