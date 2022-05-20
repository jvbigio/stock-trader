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

  // this is the function that will be called when the user clicks the buy button
  // create a new function that will handle users CashBalance? Separation of concerns?
  // but the option to buy a stock relies on having the cash available...
  // const fetchData = async () => {
  //   // original fetchData
  //   const buyStockUrl = `/api/stocks/buy?stock_symbol=${inputs.stockSymbol}`
  //   const data = {
  //     symbol: inputs.stockSymbol,
  //     // quantity: inputs.shareAmount
  //     amount: inputs.shareAmount // original
  //   }
  //   const response = await axios.post(buyStockUrl, data)
  //   setStockData(response.data)
  //   console.log(response.data.value)
  //   console.log(response.data.price)
  //   console.log(response.data)
  // }

  // const getTotalValue = () => {
  //   for (const stock of userTable) {
  //     console.log(stock.value)
  //   }
  // }

  // useEffect(() => {
  //   // getTotalValue()
  //   for (const stock of userTable) {
  //     // console.log(stock.value)
  //     // make sure userCashBalance is greater than stock to buy
  //     if (userCashBalance > stock.value) {
  //       // update userCashBalance
  //       setUserCashBalance(
  //         prevState =>
  //           (prevState = parseInt(inputs.amount) * parseInt(stock.value))
  //       )
  //     }
  //   }
  // }, [userTable])

  // show cashBalanceAlert ternary here?

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
    // debugger
    // console.log(stockData.price) // undefined
    // only execute buyStockUrl if user has enough cash
    const response = await axios.post(buyStockUrl, data)
    if (userCashBalance >= inputs.shareAmount * response.data.price) {
      setStockData(response.data)
      console.log(response.data.price)
      console.log(response.data.value)
      // not working properly - not persisting on refresh - need local storage to persist
      setUserCashBalance(prevState => prevState - response.data.value)
      localStorage.setItem('userCashBalance', userCashBalance)
      // set userCashBalance to the new value in localStorage

      console.log(`Cash Balance: ${userCashBalance}`)
    } else {
      alert('You do not have enough cash to buy this stock')
    }
  }

  // set local storage userCashBalance
  // const updateUserCashBalance = () => {
  //   console.log(userCashBalance)
  //   localStorage.setItem('userCashBalance', userCashBalance)
  // }

  // // get local storage userCashBalance
  const getUserCashBalance = () => {
    // const userCashBalance = localStorage.getItem('userCashBalance')
    localStorage.getItem('userCashBalance')
    // console.log(`Cash: ${userCashBalance}`)
    setUserCashBalance(userCashBalance)
  }

  useEffect(() => {
    getUserCashBalance()
  }, [])

  // // render updateUserCashBalance when user buys stock
  // useEffect(() => {
  //   updateUserCashBalance()
  // }, [])

  // refactored fetchData
  // const fetchData = async () => {
  //   const buyStockUrl = `/api/stocks/buy?stock_symbol=${inputs.stockSymbol}`
  //   const data = {
  //     symbol: inputs.stockSymbol,
  //     amount: inputs.shareAmount
  //   }
  //   // iterate over userTable to get the holding value of the stock

  //   // if userCashBalance is greater than the holding value, then buy the stock
  //   // then subtract the holding value from the user's cash balance
  //   // then add the stock to the user's table
  //   // else, alert the user that they don't have enough cash
  //   // try creating state to keep track of user's cash balance

  //   // const userCashBalance = await axios.get('/api/stocks/user')
  //   // console.log(userCashBalance)
  //   // setUserCashBalance(userCashBalance.data.cashBalance)

  //   userTable.data.forEach(stock => {
  //     // causes too many requests
  //     if (userCashBalance > stock.value) {
  //       axios.post(buyStockUrl, data)
  //       setUserCashBalance(prevState => prevState - stock.value)
  //       setUserTable(prevState => [...prevState, stock])
  //     } else {
  //       alert('You do not have enough cash to buy this stock')
  //     }
  //   })
  // }

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
  //       if (userCashBalance > stock.value) {
  //         setUserCashBalance(prevState => prevState - stock.value)
  //         console.log(userCashBalance)
  //         // console.log(stock.value)
  //       } else if (userCashBalance < stock.value) {
  //         console.log('not enough cash')
  //       }
  //     })
  //   }
  //   updateCashBalance()
  // })

  // option 2
  // useEffect(() => {
  //   const handleUserCashBalance = () => {
  //     if (userCashBalance > 0) {
  //       userTable.forEach(stock => {
  //         // console.log(stock.value)
  //         setUserCashBalance(prevState => prevState - stock.value)
  //         console.log(userCashBalance)
  //       })
  //       // stop the function and don't subtract
  //       console.log('no more money')
  //     }
  //     // console.log(userCashBalance)
  //   }
  //   handleUserCashBalance()
  // }, [userCashBalance, userTable])

  // option 3
  // maybe instead of useEffect try to use /buy route?
  // useEffect(() => {
  //   const handleUserCashBalance = () => {
  //     userTable.forEach(stock => {
  //       // console.log(stock.value)
  //       if (userCashBalance > 0 && userCashBalance > stock.value) {
  //         setUserCashBalance(prevState => prevState - stock.value)
  //         // console.log(userCashBalance)
  //       } else if (userCashBalance <= 0) {
  //         console.log('no more money')
  //         // stop function
  //       }
  //     })
  //     // console.log(userCashBalance)
  //   }
  //   handleUserCashBalance()
  // }, [userCashBalance, userTable])

  // console.log(userTable) // works. work on iterating through the user's stocks

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
