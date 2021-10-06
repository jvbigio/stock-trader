import React from 'react'
import './Home.css'

import { Box, Typography, Container, Card, CardContent, CardMedia, Paper, Grid } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { sizing } from '@mui/system'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

// move images to own file and import
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
import MarketTrends from '../images/stockMarketData.png'

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
      </Container>
      <Container
        maxWidth='md'
        sx={{ width: { xs: 250, sm: 500, md: 600, lg: 700 } }}
      >
        <Box
          className='flex-box'
          component='div'
          display='flex'
          flexDirection='row'
          justifyContent='center'
          alignItems='center'
        >
          <Box
            className='flex-img'
            component='img'
            src={hand}
            p={1}
            mb={1}
          />
          <Box
            className='flex-img'
            component='img'
            src={report}
            p={1}
            mb={1}
          />
          <Box
            className='flex-img'
            component='img'
            src={mobileTransaction}
            p={1}
            mb={1}
          />
        </Box>
      </Container>
      {/* maxWidth in card below throws DOM error */}
      {/* <Card sx={{ display: 'flex', mt: 5, justifyContent: 'center', width: 'md' }} elevation={0} maxWidth='md'> */}
      {/* <Card id='secondary-content' sx={{ display: 'flex', mt: 5, justifyContent: 'center', maxWidth: 'md' }} elevation={12}> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography variant='h6' gutterBottom textAlign='center' className='description-main'>
            StoX is a stock trading platform that allows you to trade with fantasy money
          </Typography>
          <Typography variant='body2' textAlign='center' className='description-secondary'>
            Mastery comes with practice...
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <ExpandMoreIcon />
          <Paper sx={{ bgcolor: 'whitesmoke', display: 'flex', flexDirection: 'column', height: 250, width: 500, mt: 5 }} elevation={0}>
            <Typography variant='body2' align='center' flexDirection='column' pt={2}>
              Add content here...
            </Typography>
          </Paper>
        </Box>
      </Box>
      {/* </Card> */}
    </ThemeProvider>
  )
}

export default Home
