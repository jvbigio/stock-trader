import React, { useState, useContext } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

// import { LoginContext } from '../context/LoginProvider'
import { AuthProvider } from './context/AuthContext'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Report from './pages/Report'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

import './App.css'

const App = () => {
  // const [loggedIn, setLoggedIn] = useState(false)
  // persist a boolean value in localStorage to keep user logged in.
  // const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))

  return (
    <Router>
      <AuthProvider>
        <div className='App'>
          <Navbar />
          {/* <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> */}
          <main className='card'>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/portfolio' component={Portfolio} />
              <Route path='/report' component={Report} />
              <Route path='/login' component={Login} />

              {/* redirect from login to portfolio if logged in */}
              {/* <Route
              path='/login'
              render={() => {
                // return isLoggedIn ? (
                //   <Portfolio setIsLoggedIn={setIsLoggedIn} />
                // ) : (
                //   <Redirect to='/portfolio' />
                // )
                return isLoggedIn ? <Redirect to='/portfolio' /> : <Login />
              }}
            /> */}
              <Route path='/signUp' component={SignUp} />
            </Switch>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
