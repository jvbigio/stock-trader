import React, { useState, useEffect } from 'react'
import './Portfolio.css'
import HoldingsTable from '../components/HoldingsTable'

import { Grid, Paper, Container, Box } from '@mui/material'

import axios from 'axios'

const Portfolio = () => {
  const [open, setOpen] = useState(false)
  const [inputs, setInputs] = useState({})
  const [stockData, setStockData] = useState({})
  const [userTable, setUserTable] = useState([])
  const [userCashBalance, setUserCashBalance] = useState(0)
  const [sellingStockSymbol, setSellingStockSymbol] = useState('')

  // testing, try using this to add to userCashBalance when stock sold
  const [soldStock, setSoldStock] = useState({
    symbol: '',
    amount: ''
  })

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // just added toUpperCase. Make sure no bugs:
  const getUserInput = e => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value.toUpperCase()
    }))
  }

  /*
   NOTES:

   Maybe try to set userCashBalance inside fetchData, but have the userCashBalance in its own route?
   ex: /api/users/:user_id/cash_balance

   Manage cash balance inside that route but set it in fetchData?
    ex: /api/users/:user_id/cash_balance/buy?stock_symbol=${inputs.stockSymbol}&amount=${inputs.shareAmount} // another example for brainstorming solution.

  NEW:
    use MUI Alert for when userCashBalance < the stock value being purchased.
    handle userCashBalance in a separate function since it is all frontend.
  */

  // another FetchData option to try:
  // manage user cash balance to buy stocks
  const fetchData = async () => {
    // console.log(userCashBalance)

    const buyStockUrl = `/api/stocks/buy?stock_symbol=${inputs.stockSymbol}&amount=${inputs.shareAmount}`
    const data = {
      symbol: inputs.stockSymbol,
      amount: inputs.shareAmount
    }

    const response = await axios.post(buyStockUrl, data)
    if (userCashBalance >= inputs.shareAmount * response.data.price) {
      setStockData(response.data)
      console.log(response.data.price)
      console.log(response.data.value)
      // not working properly - not persisting on refresh - need local storage to persist
      // setUserCashBalance(
      //   prevState => (prevState -= parseInt(response.data.value))
      // ) // keep!!!

      // JSON.stringify first:
      // localStorage.setItem('userCashBalance', JSON.stringify(userCashBalance))
      // localStorage.setItem('userCashBalance', userCashBalance)
      // set userCashBalance to the new value in localStorage
    } else {
      alert('You do not have enough cash to buy this stock')
    }
  }

  const getUserHoldings = async () => {
    const response = await axios.get('/api/stocks/user')
    setUserTable(response.data)
    // console.log(response.data) // array of the stocks the user owns
  }

  // console.log(userTable) // works. work on iterating through the user's stocks

  useEffect(() => {
    getUserHoldings()
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
    // testing
    isTransactionBuyOrSell(e)
  }

  // TODO: maybe wait to add this functionality to allow profits from selling stock so balance goes above/below based on current stock price when sold
  const isTransactionBuyOrSell = e => {
    // testing to capture when buy or sell to manage userCashBalance:
    // get current className of the button
    // const className = e.target.className
    // console.log(className) // works
    if (e.target.className === 'buy-button') {
      console.log('buy')
    } else if (e.target.className === 'sell-button') {
      console.log('sell')
    }
  }

  // handle cash
  const getCash = async () => {
    try {
      // once register function works, will need to getItem from localStorage for user_id
      // const response = await axios.get(`/api/cash/${data}.id`) // use this when registration works
      const response = await axios.get('/api/cash')

      return response.data
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getCash()
      .then(res => setUserCashBalance(res.userCashBalance))
      .catch(err => console.error(err.message))
  }, [userTable])

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
                setUserCashBalance={setUserCashBalance}
              />
            </Paper>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Portfolio
