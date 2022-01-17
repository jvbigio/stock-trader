import React from 'react'
import './Portfolio.css'
import { HoldingsTable } from '../components/HoldingsTable'

import { Grid, Paper, Container, Box } from '@mui/material'

// const axios = require('axios').default

const Portfolio = () => {
  // Now to get all the stocks you can make a separate route and call that from the client to get all the stocks per user.
  // const getTableData = await axios.get('api/stocks')
  // console.log(getTableData)
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component='main'
        sx={{
          backgroundColor: theme =>
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
  )
}

export default Portfolio
