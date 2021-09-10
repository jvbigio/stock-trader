import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Navigation from './components/Navigation'
import Home from './pages/Home'
import Summary from './pages/Summary'
import Report from './pages/Report'
import './App.css'

// This is my orig project before implementing Material ui.
// keep in case you want to revert back.

function App () {
  return (
    <Router>
      <div className='App'>
        <Navigation />
        <main className='card'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/summary' component={Summary} />
            <Route path='/report' component={Report} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
