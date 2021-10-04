import React from 'react'
import './Home.css'

import QuiltedImageList from '../components/QuiltedImageList'

import { Box, Typography, Container, Card, CardContent, CardMedia, Paper, Grid } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import chart from '../images/data-chart.jpg'
import analysis from '../images/analysis.jpg'
import bull from '../images/bull.jpg'
import business from '../images/business.jpg'
import data from '../images/data.jpg'
import lightBulb from '../images/light-bulb.jpg'
import suit from '../images/suit.jpg'
import mobileStocks from '../images/mobile-stocks.jpg'
import people from '../images/people.jpg'
import report from '../images/report.jpg'
import mobileTransaction from '../images/phone-transaction.jpg'
import hand from '../images/hand.jpg'
import work from '../images/work.jpg'

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
        {/* card & paper, grid is new tag for test */}
        {/* <Card sx={{ width: 900 }}> */}
        {/* <Paper sx={{ width: '100%', height: 200 }}> */}
        {/* <Grid container spacing={1}> */}
        {/* <Grid item xs={6}> */}
        <Container maxWidth='lg'>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='center'
          // flexWrap='wrap'
            p={1}
            mb={1}
          // width='100%'
            maxWidth='md'
          >
            <Box
              component='img'
            // width='75%'
            // height='50%'
              src={hand}
              p={1}
              mb={1}
            />
            <Box
              component='img'
            // width='75%'
            // height='50%'
              src={report}
              p={1}
              mb={1}
            />
            <Box
              component='img'
            // width='75%'
            // height='50%'
              p={1}
              mb={1}
              src={mobileTransaction}
            />
          </Box>
        </Container>
        {/* </Grid> */}
        {/* </Grid> */}
      </Container>
    </ThemeProvider>
  )
}

export default Home
