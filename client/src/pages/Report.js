import React from 'react'

import MarketActivityChart from '../components/DowActivityChart'
import NasdaqActivityChart from '../components/NasdaqActivityChart'
import SAndPActivityChart from '../components/SAndPActivityChart'

import { Container, Box, Paper, Grid, Typography } from '@mui/material'

const Report = () => {
  return (
    <>
      {/* <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}> */}
      <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          {/* Holdings Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240
              }}
            >
              {/* render chart  here */}
            </Paper>
          </Grid>
          {/* Total Value of holdings based on gains/losses */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240
              }}
            >
              {/* Render holdings value  with pie chart here showing %'s */}
            </Paper>
          </Grid>
          {/* DJIA Activity */}
          {/* <Grid item xs={12} md={12} lg={6}> */}
          <Grid item xs={12} md={12} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                // height: 240
                height: 350
              }}
            >
              {/* Render Market activity chart here */}
              <MarketActivityChart />
            </Paper>
          </Grid>
          {/* NASDAQ Activity */}
          {/* <Grid item xs={12} md={12} lg={6}> */}
          <Grid item xs={12} md={12} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                // height: 240
                height: 350
              }}
            >
              <NasdaqActivityChart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                // height: 240
                height: 350
              }}
            >
              <SAndPActivityChart />
            </Paper>
          </Grid>
        </Grid>
        {/* <Copyright sx={{ pt: 4 }} /> */}
      </Container>
    </>
  )
}

export default Report
