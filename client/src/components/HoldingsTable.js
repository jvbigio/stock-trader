import React, { useState } from 'react'

// import { Box, Link, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Title, Paper, Typography } from '@mui/material'
// import { DataGridPro } from '@mui/x-data-grid-pro'
import { DataGrid } from '@mui/x-data-grid'

// THIS BRANCH IS FOR DATA GRID PAGINATION, NOT TABLE PAGINATION
const columns = [
  { field: 'id', headerName: 'ID', type: 'number', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'symbol', headerName: 'Symbol', width: 130 },
  { field: 'price', headerName: 'Price', type: 'number', width: 90 },
  { field: 'currentValue', headerName: 'Current Value', type: 'number', width: 90 },
  { field: 'quantity', headerName: 'Quantity', type: 'number', width: 90 }
]

const rows = [
  { id: 0, name: 'AMC Entertainment Holdings Inc', symbol: 'AMC', price: 36.01, currentValue: 1800.50, quantity: 50 },
  { id: 1, name: 'Alphabet Inc', symbol: 'GOOGL', price: 2727.13, currentValue: 54542.60, quantity: 20 },
  { id: 2, name: 'Novavax Inc', symbol: 'NVAX', price: 164.21, currentValue: 15536.80, quantity: 80 },
  { id: 3, name: 'Facebook Inc', symbol: 'FB', price: 331.45, currentValue: 16572.50, quantity: 50 },
  { id: 4, name: 'Apple Inc', symbol: 'AAPL', price: 139.79, currentValue: 6989.50, quantity: 50 },
  { id: 5, name: 'GameStop Corp', symbol: 'GME', price: 168.26, currentValue: 5047.80, quantity: 30 },
  { id: 6, name: 'Shopify Inc', symbol: 'SHOP', price: 1348.53, currentValue: 1348.53, quantity: 10 }
]

export default function HoldingsTable () {
  const [page, setPage] = useState(0)

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(r) => r.id}
        page={page}
        onPageChange={(newPage) => setPage(newPage)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        pagination
        checkBoxSelection
      />
    </div>
  )
}
