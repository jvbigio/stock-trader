import React, { useState } from 'react'
import axios from 'axios'

import {
  Modal,
  Box,
  Button,
  Typography,
  Fade,
  Fab,
  Tooltip,
  TextField
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
// import { json } from 'express'

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

// TODO:
/*
 In your buy modal, purchase the stock
- Server side: save stock to db
- In either your portfolio page or your report page you’ll have access to the latest data once you’re db is updated from the previous step.
*/

export default function BuyModal () {
  const [open, setOpen] = useState(false)
  const [inputs, setInputs] = useState({})
  const [stockData, setStockData] = useState({})
  const [submitDisabled, setSubmitDisabled] = useState(true)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const getUserInput = e => {
    const submitValid = inputs.stockSymbol && inputs.shareAmount
    setSubmitDisabled(!submitValid)
    setInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const buyStockUrl = `/api/stocks/buy?stock_symbol=${inputs.stockSymbol}`
    // const body = { stockData }
    try {
      const response = await axios.post(buyStockUrl, { stockData: stockData })
      setStockData(response.data) // orig
      // console.log(stockData) // doesn't return API data
      console.log(response.data) // returns API data
      // console.log(inputs)
      // console.log(response)
    } catch (err) {
      console.error(err)
    }
    setInputs({ ...inputs, stockSymbol: '', shareAmount: '' })
  }

  return (
    <>
      <Tooltip
        title='Buy'
        placement='left'
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 800 }}
      >
        <Fab
          onClick={handleOpen}
          sx={{
            backgroundColor: '#1373B4',
            '&:hover': { backgroundColor: '#1976D2' },
            color: '#FFF'
          }}
          aria-label='add'
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            gutterBottom
          >
            Buy
          </Typography>
          <Typography variant='subtitle2' textAlign='center' gutterBottom>
            Cash Available to Trade: ${100000.0}
          </Typography>
          <Box
            autoComplete='off'
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
          >
            <TextField
              id='stock-symbol'
              label='Symbol'
              variant='outlined'
              color='success'
              helperText={`Last Price: $${36.64}`}
              name='stockSymbol'
              value={inputs.stockSymbol || ''}
              // value={inputs.stockSymbol}
              onChange={getUserInput}
              // other option
              // onChange={e => setInputs(e.target.value)}
            />
            <TextField
              id='share-amount'
              label='Share Amount'
              variant='outlined'
              color='success'
              helperText={`Estimated Value: $${7500.14}`}
              name='shareAmount'
              value={inputs.shareAmount || ''}
              // value={inputs.shareAmount}
              onChange={getUserInput}
              // onChange={e => setInputs(e.target.value)}
            />
            <Button
              disabled={submitDisabled}
              onClick={handleSubmit}
              variant='contained'
              sx={{
                backgroundColor: '#1373B4',
                '&:hover': { backgroundColor: '#1976D2' },
                color: '#FFF'
              }}
            >
              Order
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
