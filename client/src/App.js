import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Report from './pages/Report'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

import './App.css'

export const StockContext = React.createContext()

function App () {
  const [stockData, setStockData] = useState({})
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <main className='card'>
          <Switch>
            <Route path='/' exact component={Home} />
            <StockContext.Provider value={stockData}>
              <Route path='/portfolio' component={Portfolio} />
            </StockContext.Provider>
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
