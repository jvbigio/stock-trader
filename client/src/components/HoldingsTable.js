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

  const handleClick = (e, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (e, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

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
                <TableCell align='right'>{row.price}</TableCell>
                <TableCell align='right'>{row.currentValue}</TableCell>
                <TableCell align='right'>{row.quantity}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* </TableContainer> */}
    </>
  )
}
