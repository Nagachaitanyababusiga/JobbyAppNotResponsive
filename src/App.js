import {Switch, Route, Redirect} from 'react-router-dom'

import AuthRoute from './components/AuthRoute'
import Home from './components/Home'
import JobItemDetails from './components/JobItemDetails'
import Jobs from './components/Jobs'
import Login from './components/Login'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <AuthRoute exact path="/" component={Home} />
    <AuthRoute exact path="/jobs/:id" component={JobItemDetails} />
    <AuthRoute exact path="/jobs" component={Jobs} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
