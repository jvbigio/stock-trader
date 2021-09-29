import React from 'react'
import './Home.css'

import { Box, Typography, Paper, Container } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import chart from '../images/data-chart.jpg'

const theme = createTheme()

theme.typography.h4 = {
  // fontSize: '1.2rem',
  // '@media (min-width: 600px': {
  //   fontSize: '1.5rem'
  // },
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
    </ThemeProvider>
  )
}

// orig
// const Home = () => {
//   return (
//     <div className='flex-wrapper'>
//       <header className='intro'>
//         Simple. Intuitive. Fast.
//         <br />
//         Test drive StoX's fantasy trading experience
//       </header>
//       <main className='content-wrapper'>
//         <div className='image-bg' />
//       </main>
//     </div>
//   )
// }

export default Home
