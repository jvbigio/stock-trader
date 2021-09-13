import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Report from './pages/Report'
import Login from './pages/Login'
import './App.css'

// import { ThemeProvider } from '@material-ui/core'
// import theme from './utils/theme'

function App () {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <main className='card'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/summary' component={Portfolio} />
            <Route path='/report' component={Report} />
            <Route path='/login' component={Login} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}
// function App () {
//   return (
//     <ThemeProvider theme={theme}>
//       <Router>
//         <div className='App'>
//           <Navbar />
//           <main className='card'>
//             <Switch>
//               <Route path='/' exact component={Home} />
//               <Route path='/summary' component={Portfolio} />
//               <Route path='/report' component={Report} />
//               <Route path='/login' component={Login} />
//             </Switch>
//           </main>
//         </div>
//       </Router>
//     </ThemeProvider>
//   )
// }

export default App
