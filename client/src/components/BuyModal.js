import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { roundAccurately } from '../utils/helper-function'

import {
  Modal,
  Box,
  Button,
  Typography,
  Fade,
  Fab,
  Tooltip,
  TextField,
  Alert
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

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

export default function BuyModal ({
  inputs,
  getUserInput,
  handleBuySubmit,
  open,
  handleOpen,
  handleClose,
  userCashBalance
}) {
  return (
    <>
      <Tooltip
        title='Buy'
        placement='right'
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
            Cash Available to Trade: $
            {roundAccurately(userCashBalance, 2).toFixed(2)}
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
            // onSubmit={handleBuySubmit} // testing
          >
            <TextField
              id='stock-symbol'
              label='Stock Symbol'
              variant='outlined'
              color='success'
              // use this to do a route for /quote with stock symbol only and render price:
              // helperText={`Current Price: $${36.64}`}
              // ternary helperText:
              helperText={
                inputs.stockSymbol
                  ? `${inputs.stockSymbol} Price: $${36.64}`
                  : `Stock Price $${36.64}`
              }
              name='stockSymbol'
              value={inputs.stockSymbol || ''}
              onChange={getUserInput}
              // onError={getUserInput}
            />
            <TextField
              id='share-amount'
              label='Share Amount'
              variant='outlined'
              color='success'
              // create conditional to show error if useCashBalance === 0, else success
              // also, see if u can show total value based on stock * quantity:
              helperText={`Estimated Value: $${7500.14}`}
              name='shareAmount'
              type='number'
              value={inputs.shareAmount || ''}
              onChange={getUserInput}
              // testing - not working yet:
              // error={userCashBalance === 0}
              // helperText={userCashBalance === 0 ? 'Insufficient Funds' : ''}
            />
            <Button
              disabled={!(inputs.stockSymbol && inputs.shareAmount)}
              onClick={handleBuySubmit}
              // onSubmit={handleSubmit} // not working
              variant='contained'
              sx={{
                backgroundColor: '#1373B4',
                '&:hover': { backgroundColor: '#1976D2' },
                color: '#FFF'
              }}
              // testing:
              className='buy-button'
            >
              Order
            </Button>
          </Box>
          {/* only show Alert when userCashBalance insufficient */}
          {/* do in Portfolio to alert true/false then import that into here to show when truthy */}
          {userCashBalance && (
            <Alert severity='error'>
              Insufficient Funds - Unable to Complete!
            </Alert>
          )}
        </Box>
      </Modal>
    </>
  )
}
