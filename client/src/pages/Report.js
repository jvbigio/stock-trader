import React from 'react'

import { Container, Box, Paper, Grid, Typography } from '@mui/material'

const Report = () => {
  return (
    <>
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
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
              {/* Render holdings value here */}
            </Paper>
          </Grid>
          {/* Market Activity */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240
              }}
            >
              {/* Render Market activity chart here */}
            </Paper>
          </Grid>
        </Grid>
        {/* <Copyright sx={{ pt: 4 }} /> */}
      </Container>
    </>
  )
}

export default Report
