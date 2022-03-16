import React, { useState, useEffect } from 'react'
import './Portfolio.css'
import { HoldingsTable } from '../components/HoldingsTable'

import { Grid, Paper, Container, Box } from '@mui/material'

import axios from 'axios'

const Portfolio = () => {
  const [open, setOpen] = useState(false)
  const [inputs, setInputs] = useState({})
  const [stockData, setStockData] = useState({})
  const [userTable, setUserTable] = useState([])
<<<<<<< HEAD
  // testing
  const [sellingStockSymbol, setSellingStockSymbol] = useState('')
  const [sellingStockQuantity, setSellingStockQuantity] = useState('')
=======
  const [sellingStockSymbol, setSellingStockSymbol] = useState('')
>>>>>>> sellstock

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getUserInput = e => {
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

  const getUserHoldings = async () => {
    const response = await axios.get('/api/stocks/user')
    setUserTable(response.data)
  }

  useEffect(() => {
    getUserHoldings()
  }, [userTable])

  const handleBuySubmit = async e => {
    e.preventDefault()
    fetchData()
    // getUserHoldings()
    handleClose()
    setInputs({ ...inputs, stockSymbol: '', shareAmount: '' })
  }

  // selling stock
  const handleSellOpen = e => {
    setOpen(true)

    const stockSymbol =
      e.target.parentElement.parentElement.parentElement.firstChild.nextSibling
        .innerText
    console.log(stockSymbol)
    setSellingStockSymbol(stockSymbol)
  }

  const handleSellButtonClick = async e => {
    try {
      // send sell request to server with stockSymbol and sellingStockQuantity
      e.preventDefault()
      // console.log(inputs.shareAmount) // works
      const SellStockRequest = '/api/stocks/sell'
      const data = {
        stockSymbol: sellingStockSymbol,
        amount: inputs.shareAmount
      }

      const sellStockResponse = await axios.post(SellStockRequest, data)
      console.log(sellStockResponse.data)

      // setSellingStockQuantity(inputs.shareAmount)
      // setSellingStockQuantity(sellStockResponse.data.sellingStockQuantity)
      handleClose()
    } catch (error) {
      console.log(error)
    }
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
                getUserInput={getUserInput}
                handleBuySubmit={handleBuySubmit}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                userTable={userTable}
                handleSellOpen={handleSellOpen}
                handleSellButtonClick={handleSellButtonClick}
                sellingStockSymbol={sellingStockSymbol}
              />
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Portfolio
