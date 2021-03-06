import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  Modal,
  Box,
  Button,
  Typography,
  Fade,
  Tooltip,
  TextField
} from '@mui/material'

import SellIcon from '@mui/icons-material/Sell'
import { roundAccurately } from '../utils/helper-function'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

// stockData testing props
export default function SellModal({
  inputs,
  getUserInput,
  getUserHoldings,
  // stockData,
  // handleSellButtonClick,
  sellingStockSymbol,
  setSellingStockSymbol,
  soldStock,
  setSoldStock
  // handleClose,
  // handleSellOpen,
  // handleSellClose
}) {
  // TODO: delete all unused code comments

  const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true) // original
  // const [sellingStockSymbol, setSellingStockSymbol] = useState('') // moved to portfolio to test
  // const [sellingStockQuantity, setSellingStockQuantity] = useState('')
  // const [soldStock, setSoldStock] = useState({
  //   symbol: '',
  //   quantity: ''
  // }) // testing
  // const [sellingStockData, setSellingStockData] = useState({})

  const handleSellOpen = e => {
    setOpen(true)

    const stockSymbol =
      e.target.parentElement.parentElement.parentElement.firstChild.nextSibling
        .innerText
    setSellingStockSymbol(stockSymbol) // keep
  }

  const handleSellClose = () => setOpen(false)

  const handleSellButtonClick = async e => {
    try {
      // send sell request to server with stockSymbol and sellingStockQuantity
      e.preventDefault()
      const sellStockRequest = `/api/stocks/sell?stock_symbol=${sellingStockSymbol}&quantity=${inputs.shareAmount}`
      // use this to update the users cash balance (1 stock sold = 1 * stock price), then add to users cash balance
      // should this be changed to state?
      const stockData = {
        symbol: sellingStockSymbol,
        amount: inputs.shareAmount
      }
      // console.log(stockData.symbol, stockData.amount) // works. This is the stock symbol and quantity sold

      const sellStockResponse = await axios.post(sellStockRequest, stockData) // original
      // await axios.post(sellStockRequest, stockData) // keep. this works

      // works
      setSoldStock({
        symbol: sellStockResponse.data.symbol,
        amount: inputs.shareAmount
      })

      // works
      // setSoldStock(soldStock => ({
      //   ...soldStock,
      //   ...stockData
      // }))

      console.log(
        `soldStock: ${soldStock.symbol}, ${soldStock.amount}, stockData: ${stockData.symbol}, ${stockData.amount}, sellStockRequest: ${sellStockRequest}`
      )

      // clear inputs after submit
      // setInputs({ ...inputs, stockSymbol: '', shareAmount: '' }) // from portfolio.js
      inputs.shareAmount = ''
      // inputs.stockSymbol = ''
    } catch (error) {
      console.log(error)
    }
    handleSellClose()
  }

  return (
    <>
      <Tooltip
        title='Sell'
        placement='right'
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 800 }}
      >
        <SellIcon
          onClick={handleSellOpen}
          sx={{ cursor: 'pointer' }}
          color='action'
        />
      </Tooltip>
      <Modal open={open} onClose={handleSellClose}>
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            gutterBottom
          >
            Sell
          </Typography>
          <Box
            component='form'
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            maxWidth='md'
            noValidate
            autoComplete='off'
            // onsubmit={handleSellButtonClick} // not working
          >
            <TextField
              id='stock-symbol'
              label='Symbol'
              variant='outlined'
              color='success'
              name='stockSymbol'
              value={sellingStockSymbol}
            />
            <TextField
              // error={
              //   !!(inputs.shareAmount === '' || inputs.shareAmount === '0')
              // }
              id='share-amount'
              label='Share Amount'
              variant='outlined'
              color='success'
              helperText={`Shares Owned:${100}`}
              // helperText={
              //   inputs.shareAmount === '0'
              //     ? 'Must be greater than 0'
              //     : `Shares Owned:${inputs.shareAmount}`
              // }
              name='shareAmount'
              type='number'
              // do not allow '0' to be entered in input
              value={inputs.shareAmount || ''} // original
              // causes error:
              // value={inputs.shareAmount === '0' ? Error : inputs.shareAmount}
              // value={
              //   inputs.shareAmount > 0
              //     ? inputs.shareAmount
              //     : (helperText = 'Value must be greater than 0')
              // }
              onChange={getUserInput}
            />
            <Button
              disabled={!inputs.shareAmount}
              onClick={handleSellButtonClick}
              // onsubmit={handleSellButtonClick} // not working
              variant='contained'
              sx={{
                backgroundColor: '#1373B4',
                '&:hover': { backgroundColor: '#1976D2' },
                color: '#FFF'
              }}
            >
              Sell
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
