import React, { useState, createContext } from 'react'

export const StockContext = createContext()

export const StockProvider = props => {
  const [stockData, setStockData] = useState({})

  return (
    <StockContext.Provider value={[stockData, setStockData]}>
      {props.children}
    </StockContext.Provider>
  )
}
