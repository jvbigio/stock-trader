import React from 'react'
import './Home.css'

import { Box, Typography, Paper } from '@mui/material'

import chart from '../images/data-chart.jpg'

const Home = () => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}
    >
      <Typography variant='h4' component='div' paragraph gutterBottom mt={2}>
        Simple. Intuitive. Fast.
        <br />
        Test drive StoX's fantasy trading experience
      </Typography>
    </Box>
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
