import React, { useState } from 'react'

import { Drawer, List, ListItem, ListItemText, ListItemIcon, ListItemButton } from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import AssessmentIcon from '@mui/icons-material/Assessment'
import LoginIcon from '@mui/icons-material/Login'
// import { margin } from '@mui/system'

import './DrawerComponent.css'

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(true)

  return (
    <Drawer
      anchor='left'
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
    >
      <List>
        <ListItem divider button>
          <ListItemIcon>
            <HomeIcon sx={{ mr: 1 }} />
            <ListItemText primary='Home' />
          </ListItemIcon>
        </ListItem>
        <ListItem divider button>
          <ListItemIcon>
            <BusinessCenterIcon sx={{ mr: 1 }} />
            <ListItemText primary='Portfolio' />
          </ListItemIcon>
        </ListItem>
        <ListItem divider button>
          <ListItemIcon>
            <AssessmentIcon sx={{ mr: 1 }} />
            <ListItemText primary='Report' />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LoginIcon sx={{ mr: 1 }} />
            <ListItemText primary='Login' />
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  )
}

// alternative way, not done... from mui docs
/*
return (
    <Drawer
      anchor='left'
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
*/

export default DrawerComponent
