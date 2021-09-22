import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { css } from '@emotion/react'

import { AppBar, Toolbar, Typography, Box, IconButton, Button, Drawer, Tab, Tabs, MenuIcon, CssBaseline } from '@mui/material'

// do i need this:
import { spacing } from '@mui/system'

import { GoHome, GoBriefcase, GoRepo } from 'react-icons/go'

// test
import './Navbar.css'
// This branch is for tabs navbar option

const Navbar = () => {
  const [value, setValue] = useState(0)

  const handleClickTab = (e, newValue) => {
    setValue(newValue)
    // setValue(e.target.value)
    // console.log(value)
  }

  return (
    <Box>
      <CssBaseline />
      <AppBar position='static' sx={{ backgroundColor: '#368727' }}>
        <Toolbar sx={{ root: 'space-between' }}>
          <Typography variant='h5'>StoX</Typography>
          <Tabs
            className='tabs-menu'
            onChange={handleClickTab}
            sx={{
              flexGrow: 1
            }}
            css={css`
              mx: 0 70px;
            `}
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
