import React, { useState } from 'react'
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

function Login () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInError, setLoggedInError] = useState(false)
  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    const login = await axios.post('/api/login', {
      email: data.get('email'),
      password: data.get('password') // network tab shows this as plain text. Should be hashed?
    })
    console.log(login.status)
    console.log('Sign in initialized')

    if (login.status === 400) {
      // alert('Incorrect email or password')
      alert('Incorrect email or password')
      setLoggedIn(false)
      setLoggedInError(true)
      // history.push('/login')
    }

    if (login.status === 200) {
      history.push('/portfolio')
      setLoggedIn(true)
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
              {loggedInError && (
                <Alert severity='error'>Incorrect email or password</Alert>
              )}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
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
