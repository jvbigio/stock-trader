import React, { useState } from 'react'

// import axios from 'axios'

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

export const HoldingsTable = ({
  handleSearch,
  stockData,
  inputs,
  getUserInput,
  handleSubmit,
  open,
  handleOpen,
  handleClose,
  userTable
}) => {
  // const [selected, setSelected] = useState([])
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

  const roundAccurately = (number, decimalPlaces) =>
    Number(Math.round(`${number}e${decimalPlaces}`) + `e-${decimalPlaces}`)

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
          // ml={1} // testing for when FAB on left side of holdings table
        >
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <BuyModal
              inputs={inputs}
              getUserInput={getUserInput}
              handleSubmit={handleSubmit}
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
            />
          </Box>
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
          {/* <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <BuyModal
              inputs={inputs}
              getUserInput={getUserInput}
              handleSubmit={handleSubmit}
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
            />
          </Box> */}
        </Box>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='holdings table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Symbol</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Value</TableCell>
              <TableCell align='right'>Quantity</TableCell>
              <TableCell align='right'>Sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userTable
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(stock => (
                <TableRow
                  key={stock.id}
                  hover
                  // returns data in table:
                  // onClick={e => handleClick(e, stock.name)}
                  onClick={handleClick}
                >
                  {/* TODO: try to shrink just the name table cell. it's taking too much width */}
                  <TableCell>{stock.name}</TableCell>
                  <TableCell className='stock-symbol' align='right'>
                    {/* <TableCell className='stockSymbol' align='right'> */}
                    {stock.symbol}
                  </TableCell>
                  <TableCell align='right'>${stock.price}</TableCell>
                  <TableCell align='right'>
                    ${roundAccurately(stock.value, 2).toFixed(2)}
                  </TableCell>
                  <TableCell align='right'>{stock.quantity}</TableCell>
                  <TableCell align='right'>
                    <SellModal
                      inputs={inputs}
                      getUserInput={getUserInput}
                      // handleSubmit={handleSubmit}
                      // open={open}
                      // handleOpen={handleOpen}
                      // handleClose={handleClose}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={userTable.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}
