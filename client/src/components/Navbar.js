import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// import './ResponsiveDrawer'
// import './Navbar.css'
// import useStyles from '../styles'
import PropTypes from 'prop-types'
import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import AssessmentIcon from '@material-ui/icons/Assessment'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { makeStyles, useTheme } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const Navbar = ({ window }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const classes = useStyles()
  const theme = useTheme()

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Home', 'Portfolio', 'Report'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <HomeIcon />
              <BusinessCenterIcon />
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='static' className={classes.navbar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open menu'
            className={classes.menuButton}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>StoX</Typography>
          <Button component={Link} to='/login' color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='nav menu'>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

// orig
// const Navbar = () => {
//   const classes = useStyles()

//   return (
//     <>
//       <AppBar position='static' className={classes.navbar}>
//         <Toolbar>
//           <IconButton
//             edge='start'
//             color='inherit'
//             aria-label='menu'
//             className={classes.menuButton}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant='h6' className={classes.title}>StoX</Typography>
//           <Button component={Link} to='/login' color='inherit'>Login</Button>
//         </Toolbar>
//       </AppBar>
//     </>
//   )
// }

export default Navbar
