import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.css'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import useStyles from '../styles'

// save this App bar version to possibly use

const Navigation = () => {
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
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navigation
