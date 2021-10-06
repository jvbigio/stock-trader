import React from 'react'
import './Portfolio.css'

import Box from '@mui/material/Box'

const Summary = () => {
  return (
    // <div className='flex-wrapper'>
    <div className='flex-wrapper' style={{ width: '100%', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          p: 1,
          m: 1,
          // bgcolor: 'background.paper',
          bgcolor: 'blue',
          height: 100,
          border: '3px solid green'
        }}
      >
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300', alignSelf: 'flex-end' }}>Item 2</Box>
        <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 3</Box>
      </Box>
    </div>
  )
}

export default Summary
