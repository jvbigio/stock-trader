import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import './Navbar.css'
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, Tab, Tabs } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
// import useStyles from '../styles'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: '#368727',
  },
  pages: {
    flexGrow: 1
  }
}))

const Navbar = () => {
  const classes = useStyles()

  return (
    <>
      <AppBar position='static' className={classes.navbar}>
        <Toolbar>
          <Typography variant='h5' className={classes.title}>StoX</Typography>
          <Tabs
            className={classes.pages}
            // value={value}
            // onChange={handleChange}
            indicatorColor='primary'
            textColor='inherit'
            centered
          >
            <Tab label='Home' />
            <Tab label='Portfolio' />
            <Tab label='Report' />
          </Tabs>
          <Button variant='contained'>Login</Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

// const Navbar = () => {
//   const classes = useStyles()

//   return (
//     <>
//       <AppBar position='static' className={classes.navbar}>
//         <Toolbar>
//           <Typography variant='h5' className={classes.title}>StoX</Typography>
//           <Tabs>
//             <Tab label='Home' />
//           </Tabs>
//           <Tabs centered>
//             <Tab label='Portfolio' />
//           </Tabs>
//           <Tabs style={{ flexGrow: 1 }}>
//             <Tab label='Report' />
//           </Tabs>
//           <Button variant='contained'>Login</Button>
//         </Toolbar>
//       </AppBar>
//     </>
//   )
// }

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
//           <Typography variant='h5' className={classes.title}>StoX</Typography>
//           <Button component={Link} to='/' color='inherit'>Home</Button>
//           <Button component={Link} to='/portfolio' color='inherit'>Portfolio</Button>
//           <Button component={Link} to='/summary' color='inherit'>Summary</Button>
//           <Button component={Link} to='/login' color='inherit'>Login</Button>
//         </Toolbar>
//       </AppBar>
//     </>
//   )
// }

export default Navbar
