import React, { useState } from 'react'

import axios from 'axios'

import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Typography
} from '@mui/material'

import BuyModal from './BuyModal'
import SellModal from './SellModal'

function createData(id, name, symbol, price, currentValue, quantity) {
  return { id, name, symbol, price, currentValue, quantity }
}

const rows = [
  createData(0, 'AMC Entertainment Holdings Inc', 'AMC', 36.01, 1800.5, 50),
  createData(1, 'Alphabet Inc', 'GOOGL', 2727.13, 54542.6, 20),
  createData(2, 'Novavax Inc', 'NVAX', 164.21, 15536.8, 80),
  createData(3, 'Facebook Inc', 'FB', 331.45, 16572.5, 50),
  createData(4, 'Apple Inc', 'AAPL', 139.79, 6989.5, 50),
  createData(5, 'GameStop Corp', 'GME', 168.26, 5047.8, 30),
  createData(6, 'Shopify Inc', 'SHOP', 1348.53, 1348.53, 10),
  createData(7, 'Virpax Pharmaceuticals', 'VRPX', 4.34, 4340.0, 1000),
  createData(8, 'Clover Health Investments Corp', 'CLOV', 7.36, 1840, 250),
  createData(9, 'United Airlines Holdings Inc', 'UAL', 50.22, 5022, 100),
  createData(10, 'AMAZONCOM INC', 'AMZN', 3261.01, 32610.1, 10)
]

export const HoldingsTable = ({ handleSearch }) => {
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  
  const handleClick = e => {
    // both work:
    // console.log(e.target.innerText)
    // console.log(e.currentTarget)
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          mb={4}
        >
          <Typography
            variant='h3'
            textAlign='center'
            component='div'
            flexGrow='1'
            gutterBottom
            mt={1}
          >
            Holdings
          </Typography>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <BuyModal />
          </Box>
        </Box>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='holdings table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Symbol</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Value</TableCell>
              <TableCell align='right'>Quantity</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <TableRow
                  key={row.id}
                  hover
                  onClick={e => handleClick(e, row.name)}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='right'>{row.symbol}</TableCell>
                  <TableCell align='right'>${row.price}</TableCell>
                  <TableCell align='right'>${row.currentValue}</TableCell>
                  <TableCell align='right'>{row.quantity}</TableCell>
                  <TableCell align='right'>
                    <SellModal />
                  </TableCell>
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
