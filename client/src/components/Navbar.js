import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { css } from '@emotion/react'

import { AppBar, Toolbar, Typography, Box, IconButton, Button, Drawer, Tab, Tabs, MenuIcon, Divider } from '@mui/material'

// do i need this:
import { spacing } from '@mui/system'

import { GoHome, GoBriefcase, GoRepo } from 'react-icons/go'

// This branch updated dependencies for v5 material ui

const Navbar = () => {
  const [value, setValue] = useState(0)

  const handleClickTab = (e, newValue) => {
    setValue(newValue)
    // setValue(e.target.value)
    // console.log(value)
  }

  return (
    <Box>
      <AppBar position='static' sx={{ backgroundColor: '#368727' }}>
        <Toolbar>
          <Typography variant='h5'>StoX</Typography>
          <Tabs
            onChange={handleClickTab}
            sx={{
              flexGrow: 1
              // justifyContent: 'center',
              // width: '100%',
              // px: 2,
              // mx: 2
            }}
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
            sx={{
              color: 'black',
              backgroundColor: '#fff'
              // ml: 'auto'
            }}
            variant='contained'
            component={NavLink}
            to='/login'
          >Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
