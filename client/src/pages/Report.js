import React from 'react'

import MarketActivityChart from '../components/DowActivityChart'
import NasdaqActivityChart from '../components/NasdaqActivityChart'
import SAndPActivityChart from '../components/SAndPActivityChart'
import PieChart from '../components/PieChart'
import LineChart from '../components/LineChart'

import { Container, Box, Paper, Grid, Typography } from '@mui/material'

const Report = () => {
  return (
    <>
      {/* <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}> */}
      <Container maxWidth='xl' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={2}>
          {/* Holdings Chart */}
          {/* <Grid item xs={12} md={8} lg={8}> */}
          <Grid item xs={12} md={6} lg={8}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                // alignContent: 'center',
                flexDirection: 'column',
                // height: 240
                height: 350
              }}
            >
              <LineChart />
            </Paper>
          </Grid>
          {/* Total Value of holdings based on gains/losses, stocks percentages, or stocks vs cash? */}
          {/* <Grid item xs={12} md={4} lg={4}> */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 1,
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
                alignContent: 'center',
                alignItems: 'center',
                // height: 240
                height: 350
              }}
            >
              {/* Render holdings value  with pie chart here showing %'s */}
              <PieChart />
              {/* MAYBE SHOW CASH/STOCK RATIO */}
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
