import React from 'react'

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

export default function BuyModal ({
  inputs,
  getUserInput,
  handleBuySubmit,
  open,
  handleOpen,
  handleClose
}) {
  return (
    <>
      <Tooltip
        title='Buy'
        // when on right side of screen:
        // placement='left'
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
            onSubmit={handleBuySubmit} // testing
          >
            <TextField
              id='stock-symbol'
              label='Symbol'
              variant='outlined'
              color='success'
              helperText={`Current Price: $${36.64}`}
              name='stockSymbol'
              value={inputs.stockSymbol || ''}
              onChange={getUserInput}
            />
            <TextField
              id='share-amount'
              label='Share Amount'
              variant='outlined'
              color='success'
              helperText={`Estimated Value: $${7500.14}`}
              name='shareAmount'
              type='number'
              value={inputs.shareAmount || ''}
              onChange={getUserInput}
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
            >
              Order
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
