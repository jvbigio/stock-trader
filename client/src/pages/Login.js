import React, { useState, useContext } from 'react'
import LoginContext from '../context/LoginProvider'

import { useHistory } from 'react-router-dom'

import axios from 'axios'

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Alert
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import CoinTree from '../images/coin-tree.jpg'
import WallStGrey from '../images/wall-street-grey.jpg'
import Subway from '../images/wall-street-subway.jpg'
import Investor from '../images/investor.jpg'
import Business from '../images/business.jpg'
import Data from '../images/data.jpg'
import Bull from '../images/bull.jpg'

const randomImage = () => {
  const myPix = [CoinTree, WallStGrey, Subway, Investor, Business, Data, Bull]
  const randomized = myPix[Math.floor(Math.random() * myPix.length)]
  return randomized
}

const Copyright = props => {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      {/* update site url after deployed to heroku */}
      <Link color='inherit' href='http://localhost:3000/'>
        StoX
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

const theme = createTheme()

// function Login ({ loggedIn, setLoggedIn}) {
const Login = () => {
  // const { loggedIn, setLoggedIn } = useContext(LoginContext) // incorrect?
  // const [loggedIn, setLoggedIn] = useContext(LoginContext) // testing
  const isLoggedIn = useContext(LoginContext)
  // elevate loggedIn state to parent component.. App? Is needed in Login, Navbar, DrawerComponent
  // const [loggedIn, setLoggedIn] = useState(false) // elevated to App. Try useContext hook also
  const [errMsg, setErrMsg] = useState('')
  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    //   try {
    //     const login = await axios.post('/api/auth/login', {
    //       email: data.get('email'),
    //       password: data.get('password')
    //     })

    //     if (login?.status === 200) {
    //       localStorage.setItem('token', JSON.stringify(login.data.token))
    //       setLoggedIn(true)
    //       history.push('/portfolio')
    //     }
    //   } catch (err) {
    //     if (!err?.login) {
    //       setErrMsg('No Server Response')
    //       setLoggedIn(false)
    //     } else if (err.login?.status === 400) {
    //       setErrMsg('Missing Username or Password')
    //       setLoggedIn(false)
    //     } else if (err.login?.status === 401) {
    //       setErrMsg('Unauthorized')
    //       setLoggedIn(false)
    //     } else {
    //       setErrMsg('Login Failed')
    //       setLoggedIn(false)
    //     }
    //   }
    //   console.log(errMsg)
    // }

    // original:
    try {
      const login = await axios.post('/api/auth/login', {
        email: data.get('email'),
        password: data.get('password') // network tab shows this as plain text. Should be hashed?
      })
      console.log(login.data)
      console.log(login.status)
      console.log('Sign in initialized')
      console.log(loggedIn)

      if (login.status === 400) {
        // setLoggedInError(true)
        // setLoggedIn(false)
        alert('Incorrect email or password')
        // setTimeout(() => {
        //   window.location.reload()
        // }, 3000)
      }

      if (login.status === 200) {
        localStorage.setItem('token', JSON.stringify(login.data.token))
        // set LoggedIn to true using context
        setLoggedIn(true)
        history.push('/portfolio')
      }
    } catch (err) {
      console.log(err)
      // setErrMsg(login.errorMesssage)
      // setLoggedIn(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: `url(${Subway})`,
            backgroundImage: `url(${randomImage()})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: t =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                type='email'
                name='email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
              {errMsg && (
                <Alert severity='error'>Incorrect email or password</Alert>
              )}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                {/* if signed in change to sign out */}
                Sign In
              </Button>
              <Grid container justifyContent='center'>
                <Grid item>
                  <Link href='/signup' variant='body2'>
                    Don't have an account? Sign Up
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Login
