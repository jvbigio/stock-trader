import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton
} from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import AssessmentIcon from '@mui/icons-material/Assessment'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const { loggedIn, setLoggedIn } = useContext(AuthContext)

  return (
    <>
      <Drawer
        anchor='left'
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <List>
          <ListItem divider button component={NavLink} to='/'>
            <ListItemIcon>
              <HomeIcon sx={{ mr: 1 }} />
              <ListItemText primary='Home' />
            </ListItemIcon>
          </ListItem>
          <ListItem divider button component={NavLink} to='/portfolio'>
            <ListItemIcon>
              <BusinessCenterIcon sx={{ mr: 1 }} />
              <ListItemText primary='Portfolio' />
            </ListItemIcon>
          </ListItem>
          <ListItem divider button component={NavLink} to='/report'>
            <ListItemIcon>
              <AssessmentIcon sx={{ mr: 1 }} />
              <ListItemText primary='Report' />
            </ListItemIcon>
          </ListItem>
          <ListItem button component={NavLink} to='/login'>
            {/* TODO: if logged out use LoginIcon, else LogoutIcon */}
            {loggedIn ? (
              <ListItemIcon>
                <LogoutIcon sx={{ mr: 1 }} />
                <ListItemText primary='Logout' />
              </ListItemIcon>
            ) : (
              <ListItemIcon>
                <LoginIcon sx={{ mr: 1 }} />
                <ListItemText primary='Login' />
              </ListItemIcon>
            )}
          </ListItem>
        </List>
      </Drawer>
      <IconButton
        sx={{ ml: 'auto' }}
        color='inherit'
        aria-label='open drawer'
        anchor='right'
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  )
}

export default DrawerComponent
