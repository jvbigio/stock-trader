// import { createContext } from 'react'

// export const AuthContext = createContext()

// original example just uses above context

// below is from dev ed video

import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))

  // first just try to pass boolean value to context:
  // const [loggedIn, setLoggedIn] = useState(false)

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
