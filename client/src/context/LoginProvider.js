import React, { useState, createContext } from 'react'

// const LoginContext = createContext()
const LoginContext = createContext({})

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false)
  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContext
