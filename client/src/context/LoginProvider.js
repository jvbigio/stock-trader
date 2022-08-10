import React, { useState, createContext } from 'react'

const LoginContext = createContext()
// const LoginContext = createContext({})

export const LoginProvider = ({ children }) => {
  // const [loggedIn, setLoggedIn] = useState(false)
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {/* <LoginContext.Provider value={[loggedIn, setLoggedIn]}> */}
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContext
