import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import './Navbar.css'
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
// import useStyles from '../styles'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: '#368727'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

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
          {/* test */}
          <Button component={Link} to='/' color='inherit'>Home</Button>
          <Button component={Link} to='/portfolio' color='inherit'>Portfolio</Button>
          <Button component={Link} to='/summary' color='inherit'>Summary</Button>
          <Button component={Link} to='/login' color='inherit'>Login</Button>
          {/* <Button color='inherit'>Portfolio</Button>
          <Button color='inherit'>Summary</Button>
          <Button color='inherit'>Login</Button> */}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
