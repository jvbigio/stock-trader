import React, { useContext } from 'react'
import { StockContext } from './App'

export default function StockContextComponent () {
  const stockData = useContext(StockContext)
  return <>{stockData}</>
}
