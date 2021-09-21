import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// import './Navbar.css'

import { css } from '@emotion/react'

import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, Tab, Tabs, MenuIcon } from '@mui/material'

import { GoHome, GoBriefcase, GoRepo } from 'react-icons/go'

// This branch updated dependencies for v5 material ui

const Navbar = () => {
  const [value, setValue] = useState(0)

  const handleClickTab = (e, newValue) => {
    setValue(newValue)
    // setValue(e.target.value)
    console.log(value)
  }

  return (
    <>
      <AppBar position='static' sx={{ backgroundColor: '#368727' }}>
        <Toolbar>
          <Typography variant='h5'>StoX</Typography>
          <Tabs
            onChange={handleClickTab}
            sx={{ flexGrow: 1 }}
            value={value}
            aria-label='menu tabs'
            indicatorColor='primary'
            textColor='inherit'
            centered
          >
            <Tab
              icon={<GoHome />}
              disableRipple
              label='Home'
              component={NavLink}
              to='/'
            />
            <Tab
              icon={<GoBriefcase />}
              disableRipple
              label='Portfolio'
              component={NavLink}
              to='/portfolio'
            />
            <Tab
              icon={<GoRepo />}
              disableRipple
              label='Report'
              component={NavLink}
              to='/report'
            />
          </Tabs>
          <Button
            sx={{ color: 'black', backgroundColor: '#fff' }}
            variant='contained'
            component={NavLink}
            to='/login'
          >Login
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
