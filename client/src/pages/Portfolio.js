import React, { useState } from 'react'
import './Portfolio.css'
import { HoldingsTable } from '../components/HoldingsTable'

import axios from 'axios'

import { Grid, Paper, Container, Box, circularProgressClasses } from '@mui/material'
// import BuyModal from '../components/BuyModal'

const Portfolio = () => {
  const [input, setInput] = useState('')

  // console.log(e.currentTarget)
  const getUserInput = e => setInput(e.target.value)

  const handleSearch = async (e) => {
    // e.preventDefault()
    console.log(e.target.value)

    // try {
    //   const response = await axios.get('/api/stocks/buy')
    //   console.log(response.data)
    // } catch (error) {
    //   console.error(error)
    // }
  }

  return (
    <Box sx={{ display: 'flex' }}>
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
  )
}

export default Portfolio
