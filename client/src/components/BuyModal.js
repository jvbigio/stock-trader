import React, { useState } from 'react'

import { Modal, Box, Button, Typography, Fade, Fab, Tooltip, TextField } from '@mui/material'

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
  // textAlign: 'center'
}

export default function BuyModal () {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Tooltip
        title='Buy'
        placement='left'
        arrow
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 800 }}
      >
        <Fab onClick={handleOpen} sx={{ backgroundColor: '#1373B4', '&:hover': { backgroundColor: '#1976D2' }, color: '#FFF' }} aria-label='add'>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2' gutterBottom>
            Buy
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
            noValidate
            autoComplete='off'
          >
            <TextField id='stock-symbol' label='Symbol' variant='outlined' color='success' sx={{ justifyContent: 'center' }} />
            <TextField id='share-amount' label='Share Amount' variant='outlined' color='success' />
          </Box>
        </Box>
      </Modal>
    </>
  )
}
