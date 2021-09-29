import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Report from './pages/Report'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

import './App.css'

function App () {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <main className='card'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/portfolio' component={Portfolio} />
            <Route path='/report' component={Report} />
            <Route path='/login' component={Login} />
            <Route path='/signUp' component={SignUp} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
