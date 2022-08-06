import React, { useState, useContext } from 'react'
import LoginContext from '../context/LoginProvider'
import { NavLink, useHistory } from 'react-router-dom'

import DrawerComponent from './DrawerComponent'
// import { css } from '@emotion/react'

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tab,
  Tabs,
  CssBaseline,
  useMediaQuery
} from '@mui/material'

import { styled, useTheme } from '@mui/system'
import { GoHome, GoBriefcase, GoRepo } from 'react-icons/go'
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import './Navbar.css'
import Login from '../pages/Login'

// const Navbar = ({ loggedIn, setLoggedIn }) => {
const Navbar = () => {
  const history = useHistory()
  const { loggedIn, setLoggedIn } = useContext(LoginContext)
  // const loginStatus = useContext(LoginContext)
  const [value, setValue] = useState(0)

  const handleClickTab = (e, newValue) => {
    setValue(newValue)
    // setValue(e.target.value)
    // console.log(e.target.value)
    // console.log(e.currentTarget)
  }

  console.log(loggedIn)

  // for login/logout button.. commented out and added a Tab instead
  // const handleBtnClick = () => {
  //   setValue(null)

  //   // TODO: if logged in, send to /api/logout route to logout user and clear localStorage
  //   if (!loggedIn) {
  //     // setLoggedIn(false)
  //     // localStorage.clear() // doesn't work
  //     localStorage.removeItem('token')
  //     history.push('/login')
  //   }
  // }

  const handleLoginLogout = () => {
    setValue(null)

    if (loggedIn) {
      setLoggedIn(true)
      history.push('/login')
      // set value to 'login'
    } else {
      setLoggedIn(false)
      localStorage.removeItem('token')
      history.push('/')
      // set tab value to 'logout'
    }
  }

  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box>
      <CssBaseline />
      <AppBar position='static' sx={{ backgroundColor: '#368727' }}>
        <Toolbar>
          <Typography className='nav-title' variant='h5'>
            {/* <Typography className='nav-title' variant='button' to='/'> */}
            StoX
          </Typography>
          {/* <Button className='nav-title' variant='text' size='large' color='inherit' disableRipple>StoX</Button> */}
          {isMatch ? (
            <DrawerComponent />
          ) : (
            <>
              <Tabs
                className='tabs-menu'
                onChange={handleClickTab}
                sx={{
                  flexGrow: 1
                }}
                value={value}
                aria-label='menu tabs'
                indicatorColor='primary'
                textColor='inherit'
                centered
              >
                <Tab
                  className='tab-item'
                  icon={<GoHome />}
                  disableRipple
                  label='Home'
                  component={NavLink}
                  to='/'
                />
                <Tab
                  className='tab-item'
                  icon={<GoBriefcase />}
                  disableRipple
                  label='Portfolio'
                  component={NavLink}
                  to='/portfolio'
                />
                <Tab
                  className='tab-item'
                  icon={<GoRepo />}
                  disableRipple
                  label='Report'
                  component={NavLink}
                  to='/report'
                />
                <Tab
                  className='tab-item'
                  // icon={<BiLogIn />}
                  icon={loggedIn ? <BiLogOut /> : <BiLogIn />}
                  disableRipple
                  label={loggedIn ? 'Logout' : 'Login'}
                  // label='Login'
                  component={NavLink}
                  to='/login'
                  onClick={handleLoginLogout}
                  // onClick={() => {
                  //   loggedIn ? handleLogout : handleLogin
                  // }}
                />
              </Tabs>
              {/* <Button
                sx={{
                  color: 'black',
                  backgroundColor: '#fff'
                }}
                variant='contained'
                component={NavLink}
                to='/login'
                // to={loggedIn ? '/portfolio' : '/login'}
                className='btn-login'
                onClick={handleBtnClick}
              >
                Login
              </Button> */}
              {/* if loggedIn show one button, else show logout button */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
