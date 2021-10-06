import React from 'react'
import TablePagination from '@mui/material/TablePagination'

export default function UsePagination ({ rows, page, handleChangePage, rowsPerPage, handleChangeRowsPerPage }) {
  return (
    <TablePagination
      component='div'
      count={rows.length}
      page={page}
      onPageChange={handleChangePage}
      // rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}
