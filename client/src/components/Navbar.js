import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import './Navbar.css'
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import useStyles from '../styles'

const Navbar = () => {
  const classes = useStyles()

  return (
    <>
      <AppBar position='static' className={classes.navbar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>StoX</Typography>
          <Button component={Link} to='/login' color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
