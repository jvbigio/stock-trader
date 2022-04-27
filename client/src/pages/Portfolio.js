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
  const [userCashBalance, setUserCashBalance] = useState(100000)
  const [sellingStockSymbol, setSellingStockSymbol] = useState('')

  // testing, try using this to add to userCashBalance when stock sold
  const [soldStock, setSoldStock] = useState({
    symbol: '',
    amount: ''
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getUserInput = e => {
    setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const fetchData = async () => {
    const buyStockUrl = `/api/stocks/buy?stock_symbol=${inputs.stockSymbol}`
    const data = {
      symbol: inputs.stockSymbol,
      // quantity: inputs.shareAmount
      amount: inputs.shareAmount // original
    }
    const response = await axios.post(buyStockUrl, data)
    setStockData(response.data)
  }

  // // testing
  // console.log(stockData)

  const getUserHoldings = async () => {
    const response = await axios.get('/api/stocks/user')
    setUserTable(response.data)
    // console.log(response.data) // array of the stocks the user owns
  }

  // option 1
  // useEffect(() => {
  //   const updateCashBalance = () => {
  //     userTable.forEach(stock => {
  //       // console.log(stock.value)
  //       setUserCashBalance(prevState => prevState - stock.value)
  //       // console.log(userCashBalance)
  //       console.log(stock.value)
  //     })
  //     // console.log(userCashBalance)
  //   }
  //   updateCashBalance()
  // }, [userTable])

  // const getCashBalance = userCashBalance.forEach(stock => {
  //   console.log(stock.value)
  //   // return stock
  // })

  // getCashBalance()

  useEffect(() => {
    getUserHoldings()
    // updateCashBalance() // testing
    // }, [userTable]) // (original) causes infinite http requests
  }, [stockData])

  // new:
  useEffect(() => {
    getUserHoldings()
  }, [soldStock])

  const handleBuySubmit = async e => {
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
                // stockData={stockData}
                inputs={inputs}
                getUserInput={getUserInput}
                handleBuySubmit={handleBuySubmit}
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                userTable={userTable}
                // test
                getUserHoldings={getUserHoldings}
                // handleSellButtonClick={handleSellButtonClick}
                // handleSellOpen={handleSellOpen}
                handleSellClose={handleClose}
                sellingStockSymbol={sellingStockSymbol}
                setSellingStockSymbol={setSellingStockSymbol}
                soldStock={soldStock}
                setSoldStock={setSoldStock}
                userCashBalance={userCashBalance}
              />
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Portfolio
