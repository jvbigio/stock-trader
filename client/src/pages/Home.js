import React from 'react'
import './Home.css'

import QuiltedImageList from '../components/QuiltedImageList'

import { Box, Typography, Container, Card, CardContent, CardMedia, Paper } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

// import chart from '../images/data-chart.jpg'
// import analysis from '../images/analysis.jpg'

const theme = createTheme()

theme.typography.h4 = {
  [theme.breakpoints.up('sm')]: {
    fontSize: '2rem'
  }
}

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='md'>
        <Box
          sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}
        >
          <Typography variant='h4' component='div' paragraph gutterBottom mt={2}>
            Simple. Intuitive. Fast.
            <br />
            Test drive StoX's fantasy trading experience
          </Typography>
        </Box>
        {/* <Card mx={5} elevation={3}>
          <CardMedia
            component='img'
            height='500'
            image={analysis}
            alt='holdings chart'
          />
          <CardContent>
            <Typography gutterBottom variant='body2' color='text.secondary' textAlign='center'>
              Take charge of your wealth
            </Typography>
          </CardContent>
        </Card> */}
        <Card mx={5} elevation={3}>
          <QuiltedImageList />
        </Card>
      </Container>
    </ThemeProvider>
  )
}

export default Home
