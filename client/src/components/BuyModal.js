import React, { useState } from 'react'

import { Modal, Box, Button, Typography, Fade, Fab, Tooltip } from '@mui/material'

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

export default function BuyModal ({ open, handleClose }) {
  // const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Buy
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Buy stock form here...
          </Typography>
        </Box>
      </Modal>
    </>
  )
}
