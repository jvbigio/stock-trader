import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// import './Navbar.css'

import { css } from '@emotion/react'

import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, Tab, Tabs, MenuIcon } from '@mui/material'
// import { MenuIcon } from '@mui/material'
// import useStyles from '../styles'
// import { flexbox } from '@material-ui/system'

import { GoHome, GoBriefcase, GoRepo } from 'react-icons/go'

// import { makeStyles } from '@material-ui/core/styles'
// import { MenuIcon } from '@material-ui/icons/Menu';
// This branch updated dependencies for v5 material ui

// NAVBAR-TEST BRANCH - VID FROM https://youtu.be/mAPT9Xh6NKE

// const useStyles = makeStyles((theme) => ({
//   navbar: {
//     backgroundColor: '#368727'
//   },
//   pages: {
//     flexGrow: 1
//   },
//   icon: {

//   }
// }))

const Navbar = () => {
  const [value, setValue] = useState(0)

  // const classes = useStyles()

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
