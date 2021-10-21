import React, { useState } from 'react'

import {
  Box, Link, TableContainer, Table, TableBody, TableCell, TableHead,
  TableRow, TablePagination, Title, Paper, Typography, Button, Fab,
  Tooltip, Fade
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SellIcon from '@mui/icons-material/Sell'
import RemoveIcon from '@mui/icons-material/Remove'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import MonetizationOn from '@mui/icons-material/MonetizationOn'

// import UsePagination from './UsePagination'
import BuyModal from './BuyModal'

function createData (id, name, symbol, price, currentValue, quantity) {
  return { id, name, symbol, price, currentValue, quantity }
}

// THIS BRANCH IS FOR PAGINATION WITH TABLE, NOT DATA GRID

const rows = [
  createData(0, 'AMC Entertainment Holdings Inc', 'AMC', 36.01, 1800.50, 50),
  createData(1, 'Alphabet Inc', 'GOOGL', 2727.13, 54542.60, 20),
  createData(2, 'Novavax Inc', 'NVAX', 164.21, 15536.80, 80),
  createData(3, 'Facebook Inc', 'FB', 331.45, 16572.50, 50),
  createData(4, 'Apple Inc', 'AAPL', 139.79, 6989.50, 50),
  createData(5, 'GameStop Corp', 'GME', 168.26, 5047.80, 30),
  createData(6, 'Shopify Inc', 'SHOP', 1348.53, 1348.53, 10),
  createData(7, 'Virpax Pharmaceuticals', 'VRPX', 4.34, 4340.00, 1000),
  createData(8, 'Clover Health Investments Corp', 'CLOV', 7.36, 1840, 250),
  createData(9, 'United Airlines Holdings Inc', 'UAL', 50.22, 5022, 100),
  createData(10, 'AMAZONCOM INC', 'AMZN', 3261.01, 32610.10, 10)
]

export const HoldingsTable = () => {
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // test
  // const [open, setOpen] = useState(false)
  // const handleOpen = () => setOpen(true)
  // const handleClose = () => setOpen(false)

  const handleClick = (e) => {
    // console.log(e.target.innerText)
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} mb={4}>
          <Typography variant='h3' textAlign='center' component='div' flexGrow='1' gutterBottom mt={1}>Holdings</Typography>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            {/* <Tooltip
              title='Buy'
              placement='left'
              arrow
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 800 }}
            >
              <Fab onClick={handleOpen} sx={{ backgroundColor: '#1373B4', '&:hover': { backgroundColor: '#1976D2' }, color: '#FFF' }} aria-label='add'>
                <AddIcon />
              </Fab>
            </Tooltip> */}
            {/* <BuyModal open={open} onClose={handleClose} /> */}
            <BuyModal />
          </Box>
        </Box>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='holdings table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Symbol</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Current Value</TableCell>
              <TableCell align='right'>Quantity</TableCell>
              {/* <TableCell>Trade</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={(e) => handleClick(e, row.name)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='right'>{row.symbol}</TableCell>
                  <TableCell align='right'>${row.price}</TableCell>
                  <TableCell align='right'>${row.currentValue}</TableCell>
                  <TableCell align='right'>{row.quantity}</TableCell>
                  <Box ml={2}>
                    <Tooltip
                      title='Sell'
                      placement='right'
                      arrow
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 800 }}
                    >
                      <SellIcon sx={{ cursor: 'pointer' }} color='action' />
                      {/* <SellIcon sx={{ cursor: 'pointer' }} color='primary' /> */}
                      {/* <SellIcon sx={{ cursor: 'pointer' }} color='secondary' /> */}
                      {/* <SellIcon sx={{ cursor: 'pointer' }} color='error' /> */}
                      {/* <SellIcon sx={{ cursor: 'pointer' }} color='info' /> */}
                      {/* <SellIcon sx={{ cursor: 'pointer' }} color='success' /> */}
                      {/* <SellIcon sx={{ cursor: 'pointer' }} color='warning' /> */}
                      {/* <Button variant='text' color='success' size='small'>Sell</Button> */}
                      {/* <Button variant='text' color='primary' size='small'>Sell</Button> */}
                      {/* <Button variant='text' color='info' size='small'>Sell</Button> */}
                      {/* <Button variant='text' color='warning' size='small'>Sell</Button> */}
                    </Tooltip>
                  </Box>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
