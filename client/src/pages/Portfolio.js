import React, { useState, useEffect } from 'react'
import './Portfolio.css'
import { HoldingsTable } from '../components/HoldingsTable'

import { Grid, Paper, Container, Box } from '@mui/material'

import axios from 'axios'

const Portfolio = () => {
  const [inputs, setInputs] = useState({}) // do i need this here?
  const [stockData, setStockData] = useState({})
  const [submitDisabled, setSubmitDisabled] = useState(true)

  const getUserInput = e => {
    const submitValid = inputs.stockSymbol && inputs.shareAmount
    setSubmitDisabled(!submitValid)
    setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const fetchData = async () => {
    const buyStockUrl = `/api/stocks/buy?stock_symbol=${inputs.stockSymbol}`
    const data = {
      symbol: inputs.stockSymbol,
      amount: inputs.shareAmount
    }
    const response = await axios.post(buyStockUrl, data)
    setStockData(response.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    fetchData()

    setInputs({ ...inputs, stockSymbol: '', shareAmount: '' })
  }

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
              <HoldingsTable
                stockData={stockData}
                fetchData={fetchData}
                inputs={inputs}
                submitDisabled={submitDisabled}
                getUserInput={getUserInput}
                handleSubmit={handleSubmit}
              />
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Portfolio
