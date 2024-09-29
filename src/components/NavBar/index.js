import Cookie from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'
import './index.css'

const NavBar = props => {
  const doLogout = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="NavCont">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logoclass"
        />
      </Link>

      <div className="linkscont">
        <div className="eachlink">
          <Link to="/">
            <p className="linkpara">Home</p>
          </Link>
        </div>
        <div className="eachlink">
          <Link to="/jobs">
            <p className="linkpara">Jobs</p>
          </Link>
        </div>
      </div>
      <button className="logout-button" type="button" onClick={doLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(NavBar)
