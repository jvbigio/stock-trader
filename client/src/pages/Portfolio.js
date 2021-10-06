import React from 'react'
import './Portfolio.css'

import { Box, Link, Table, TableBody, TableCell, TableHead, TableRow, Title } from '@mui/material'

function createData (id, name, symbol, price, currentValue, quantity) {
  return { id, name, symbol, price, currentValue, quantity }
}

const ROWS = [
  createData(0, 'AMC Entertainment Holdings Inc.', 'AMC', 36.01, 1800.50, 50),
  createData(1, 'Alphabet Inc.', 'GOOGL', 2727.13, 54542.60, 20),
  createData(2, 'Novavax Inc.', 'NVAX', 164.21, 15536.80, 80),
  createData(3, 'Facebook Inc.', 'FB', 331.45, 16572.50, 50),
  createData(4, 'Apple Inc.', 'AAPL', 139.79, 6989.50, 50),
  createData(5, 'GameStop Corp.', 'GME', 168.26, 5047.80, 30)
]

const Summary = () => {
  return (
    <>

    </>
  )
}
// const Summary = () => {
//   return (
//     // <div className='flex-wrapper'>
//     <div className='flex-wrapper' style={{ width: '100%', height: '100vh' }}>
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'flex-start',
//           p: 1,
//           m: 1,
//           bgcolor: 'background.paper',
//           height: 100
//         }}
//       >
//         <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 1</Box>
//         <Box sx={{ p: 1, bgcolor: 'grey.300', alignSelf: 'flex-end' }}>Item 2</Box>
//         <Box sx={{ p: 1, bgcolor: 'grey.300' }}>Item 3</Box>
//       </Box>
//     </div>
//   )
// }

export default Summary
