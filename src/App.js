import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Navigation from './components/Navigation'
import Home from './pages/Home'
import './App.css'

function App () {
  return (
    <Router>
      <div className='App'>
        <Navigation />
        <main className='card'>
          <Switch>
            <Route path='/' exact component={Home} />
            {/* <Route path='/summary' exact component={Summary} />
            <Route path='/report' exact component={Report} /> */}
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default App
