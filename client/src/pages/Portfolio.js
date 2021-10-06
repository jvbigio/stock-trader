import React from 'react'
import './Portfolio.css'
import { HoldingsTable } from '../components/HoldingsTable'

import { Grid, Paper, Container, Box, CssBaseline } from '@mui/material'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
// const mdTheme = createTheme()

const Portfolio = () => {
  return (
  // <ThemeProvider theme={mdTheme}>
    <Box sx={{ display: 'flex' }}>
      {/* <CssBaseline /> */}
      <Box
        component='main'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <HoldingsTable />
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Box>
  // </ThemeProvider>
  )
}
// const Summary = () => {
//   return (
//     // <div className='flex-wrapper'>
//     <div className='flex-wrapper' style={{ width: '100%', height: '100vh' }}>
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'flex-start',
//           p: 1,
//           m: 1,
//           bgcolor: 'background.paper',
//           height: 100
//         }}
//       >
//         <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
//         <Box sx={{ p: 1, bgcolor: 'grey.300', alignSelf: 'flex-end' }}>Item 2</Box>
//         <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 3</Box>
//       </Box>
//     </div>
//   )
// }

export default Portfolio
