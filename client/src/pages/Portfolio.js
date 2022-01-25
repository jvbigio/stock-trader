import React, { useState, useEffect } from 'react'
import './Portfolio.css'
import { HoldingsTable } from '../components/HoldingsTable'

import {
  Grid,
  Paper,
  Container,
  Box,
  inputAdornmentClasses
} from '@mui/material'

import axios from 'axios'

const Portfolio = () => {
  const [open, setOpen] = useState(false)
  const [inputs, setInputs] = useState({})
  // const [inputs, setInputs] = useState({ stockSymbol: '', shareAmount: '' })
  const [stockData, setStockData] = useState({})
  const [submitDisabled, setSubmitDisabled] = useState(true)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    console.log(inputs)
  }, [inputs])

  const getUserInput = e => {
    setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    const submitValid = inputs.stockSymbol && inputs.shareAmount
    setSubmitDisabled(!submitValid)

    // const submitValid =
    //   inputs.stockSymbol && inputs.shareAmount
    //     ? setSubmitDisabled(false)
    //     : setSubmitDisabled(true)
    // setSubmitDisabled(false)
    // setInputs(prevState => ({ ...prevState, [inputs.stockSymbol && inputs.shareAmount]})
    // setInputs(e.target.value)
    // setSubmitDisabled(!submitValid)
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

  const handleSubmit = async e => {
    e.preventDefault()
    fetchData()
    handleClose()
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
                inputs={inputs}
                submitDisabled={submitDisabled}
                getUserInput={getUserInput}
                handleSubmit={handleSubmit}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Portfolio
