import React, { useState, useEffect } from 'react'

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

// import axios from 'axios'
import { roundAccurately } from '../utils/helper-function'

export const HoldingsTable = ({
  handleSearch,
  // stockData,
  inputs,
  getUserInput,
  handleBuySubmit,
  open,
  handleOpen,
  handleClose,
  userTable,
  getUserHoldings,
  handleSellButtonClick,
  handleSellClose,
  handleSellOpen,
  sellingStockSymbol,
  setSellingStockSymbol,
  soldStock,
  setSoldStock,
  userCashBalance,
  setUserCashBalance
  // roundAccurately
}) => {
  // const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // test
  // console.log(userTable) // works. work on iterating through the user's stocks

  // TODO: move to useEffect to update userCashBalance
  // const handleUserCashBalance = () => {
  //   userTable.forEach(stock => {
  //     console.log(stock.value)
  //     setUserCashBalance(prevState => prevState - stock.value)
  //     console.log(userCashBalance)
  //   })
  // }

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

  // const roundAccurately = (number, decimalPlaces) =>
  //   Number(Math.round(`${number}e${decimalPlaces}`) + `e-${decimalPlaces}`)

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
              handleBuySubmit={handleBuySubmit}
              open={open}
              handleOpen={handleOpen}
              handleClose={handleClose}
              userCashBalance={userCashBalance}
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
                  <TableCell align='right'>{stock.symbol}</TableCell>
                  <TableCell align='right'>${stock.price}</TableCell>
                  <TableCell align='right'>
                    ${roundAccurately(stock.value, 2).toFixed(2)}
                    {/* {helperFunction.roundAccurately(stock.value, 2).toFixed(2)} */}
                  </TableCell>
                  <TableCell align='right'>{stock.quantity}</TableCell>
                  <TableCell align='right'>
                    <SellModal
                      inputs={inputs}
                      getUserInput={getUserInput}
                      // stockData={stockData}
                      handleClose={handleClose}
                      // test
                      getUserHoldings={getUserHoldings}
                      handleSellButtonClick={handleSellButtonClick}
                      handleSellOpen={handleSellOpen}
                      handleSellClose={handleSellClose}
                      sellingStockSymbol={sellingStockSymbol}
                      setSellingStockSymbol={setSellingStockSymbol}
                      soldStock={soldStock}
                      setSoldStock={setSoldStock}
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
