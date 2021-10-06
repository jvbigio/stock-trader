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

export default Portfolio
