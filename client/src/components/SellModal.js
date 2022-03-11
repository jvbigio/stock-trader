import React, { useState } from 'react'

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

// TODO: Have stock symbol already selected in modal since you click that specific stock row.
// TODO: validate input.shareAmount for button

export default function SellModal({
  inputs,
  getUserInput
  // handleSubmit
  // open causes error where only sell modal opens on buy too and background is black
  // open,
  // handleOpen,
  // handleClose
}) {
  // const open = () => !false
  const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true) // original
  const handleOpen = e => {
    const stockSymbolArr = []
    setOpen(true)
    // console.log(e.target.className.includes('stock-symbol').innerText)
    const stockSymbol = e.target.parentNode.parentNode.parentNode.innerText.split(
      ' '
    )
    // console.log(stockSymbol)
    let symbol = stockSymbolArr.push(stockSymbol)
    // console.log(stockSymbolArr)
    console.log(symbol)
  }
  const handleClose = () => setOpen(false)

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
          onClick={handleOpen}
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
          >
            <TextField
              id='stock-symbol'
              label='Symbol'
              variant='outlined'
              color='success'
              name='stockSymbol'
              value={inputs.stockSymbol || ''}
              onChange={getUserInput}
            />
            <TextField
              id='share-amount'
              label='Share Amount'
              variant='outlined'
              color='success'
              helperText={`Shares Owned:${100}`}
              name='shareAmount'
              value={inputs.shareAmount || ''}
              onChange={getUserInput}
            />
            <Button
              disabled={!(inputs.stockSymbol && inputs.shareAmount)}
              // handleSubmit is linked to /api/stocks/buy
              // onClick={handleSubmit}
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
