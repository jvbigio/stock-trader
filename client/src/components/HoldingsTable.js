import React from 'react'

import { Box, Link, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Title, Paper, Typography } from '@mui/material'

function createData (id, name, symbol, price, currentValue, quantity) {
  return { id, name, symbol, price, currentValue, quantity }
}

const ROWS = [
  createData(0, 'AMC Entertainment Holdings Inc', 'AMC', 36.01, 1800.50, 50),
  createData(1, 'Alphabet Inc', 'GOOGL', 2727.13, 54542.60, 20),
  createData(2, 'Novavax Inc', 'NVAX', 164.21, 15536.80, 80),
  createData(3, 'Facebook Inc', 'FB', 331.45, 16572.50, 50),
  createData(4, 'Apple Inc', 'AAPL', 139.79, 6989.50, 50),
  createData(5, 'GameStop Corp', 'GME', 168.26, 5047.80, 30)
]

function preventDefault (e) {
  e.preventDefault()
}

export const HoldingsTable = () => {
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
          {ROWS.map((row) => (
            <TableRow key={row.id}>
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
