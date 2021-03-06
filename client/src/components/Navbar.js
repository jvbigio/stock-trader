import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import DrawerComponent from './DrawerComponent'
// import { css } from '@emotion/react'

import { AppBar, Toolbar, Typography, Box, Button, Tab, Tabs, CssBaseline, useMediaQuery } from '@mui/material'

import { styled, useTheme } from '@mui/system'
import { GoHome, GoBriefcase, GoRepo } from 'react-icons/go'

import './Navbar.css'

const Navbar = () => {
  const [value, setValue] = useState(0)

  const handleClickTab = (e, newValue) => {
    setValue(newValue)
    // setValue(e.target.value)
    // console.log(e.target.value)
    // console.log(e.currentTarget)
  }

  const handleBtnClick = () => {
    setValue(null)
  }

  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box>
      <CssBaseline />
      <AppBar position='static' sx={{ backgroundColor: '#368727' }}>
        <Toolbar>
          <Typography className='nav-title' variant='h5'>StoX</Typography>
          {/* <Button className='nav-title' variant='text' size='large' color='inherit' disableRipple>StoX</Button> */}
          {isMatch
            ? <DrawerComponent />
            : (
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
                </Tabs>
                <Button
                  sx={{
                    color: 'black',
                    backgroundColor: '#fff'
                  }}
                  variant='contained'
                  component={NavLink}
                  to='/login'
                  className='btn-login'
                  onClick={handleBtnClick}
                >Login
                </Button>
              </>
              )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
