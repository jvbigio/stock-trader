import React, { useState } from 'react'

import { Box, Link, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Title, Paper, Typography } from '@mui/material'

// import UsePagination from './UsePagination'

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
  createData(6, 'Shopify Inc', 'SHOP', 1348.53, 1348.53, 10)
]

export const HoldingsTable = () => {
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  return (
    <>
      {/* <TableContainer component={Paper}> */}
      <Typography variant='h3' textAlign='center' gutterBottom>Holdings</Typography>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='holdings table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='right'>Symbol</TableCell>
            <TableCell align='right'>Price</TableCell>
            <TableCell align='right'>Current Value</TableCell>
            <TableCell align='right'>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              hover
              onClick={(e) => handleClick(e, row.name)}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell align='right'>{row.symbol}</TableCell>
              <TableCell align='right'>{row.price}</TableCell>
              <TableCell align='right'>{row.currentValue}</TableCell>
              <TableCell align='right'>{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* </TableContainer> */}
    </>
  )
}
