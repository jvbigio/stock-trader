import React, { useState } from 'react'
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

export default function SellModal({ inputs, getUserInput }) {
  const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true) // original
  const [sellingStockSymbol, setSellingStockSymbol] = useState('')
  // const [sellingStockQuantity, setSellingStockQuantity] = useState('')
  const [sellingStockData, setSellingStockData] = useState({
    symbol: '',
    quantity: ''
  }) // testing

  const handleSellOpen = e => {
    setOpen(true)

    const stockSymbol =
      e.target.parentElement.parentElement.parentElement.firstChild.nextSibling
        .innerText
    // console.log(stockSymbol) // works
    setSellingStockSymbol(stockSymbol) // keep
  }

  const handleClose = () => setOpen(false)

  const handleSellButtonClick = async e => {
    try {
      // send sell request to server with stockSymbol and sellingStockQuantity
      e.preventDefault()
      const sellStockRequest = '/api/stocks/sell'
      const stockData = {
        symbol: sellingStockSymbol,
        amount: inputs.shareAmount
      }

      // testing, not working yet:
      // const stockToSell = {
      //   stockSymbol: setSellingStockData.symbol,
      //   amount: setSellingStockData.quantity
      // }

      const response = await axios.post(sellStockRequest, stockData)

      // console.log(stockData.symbol, stockData.amount) // works
      // setSellingStockData({
      //   symbol: sellingStockSymbol,
      //   quantity: inputs.shareAmount
      // })
      setSellingStockData(stockData)

      // console.log(stockData) // works
      // console.log(response.data) // blank
      // console.log(sellingStockData)

      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  // console.log(response.data)

  // console.log(sellingStockData)

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
      <Modal open={open} onClose={handleClose}>
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
              // type={'number' && !0}
              // value={inputs.shareAmount || ''}
              value={inputs.shareAmount === '0' ? Error : inputs.shareAmount}
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
