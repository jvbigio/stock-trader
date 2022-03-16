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

export default function SellModal ({ inputs, getUserInput }) {
  const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true) // original
  const [sellingStockSymbol, setSellingStockSymbol] = useState('')
  const [sellingStockQuantity, setSellingStockQuantity] = useState('')

  const handleSellOpen = e => {
    setOpen(true)

    const stockSymbol =
      e.target.parentElement.parentElement.parentElement.firstChild.nextSibling
        .innerText
    // console.log(stockSymbol) // works
    setSellingStockSymbol(stockSymbol)
  }

  const handleClose = () => setOpen(false)

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
      handleClose()
    } catch (error) {
      console.log(error)
    }
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
              id='share-amount'
              label='Share Amount'
              variant='outlined'
              color='success'
              helperText={`Shares Owned:${100}`}
              name='shareAmount'
              type='number'
              value={inputs.shareAmount || ''}
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
