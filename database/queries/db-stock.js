// const express = require('express')
// const router = express.Router()

// const pool = require('../../db/index')
const pool = require('../../database/db')

const buyStockQuery = async (name, symbol, price, value, amount) => {
  const buyStock = await pool.query(
    'INSERT INTO holdings(name, symbol, price) VALUES($1, $2, $3) RETURNING *',
    [name, symbol, price, value, amount]
  )
  // console.log(buyStock.rows[0])
  return buyStock.rows
}

// const buyStockQuery = await pool.query(
//   'INSERT INTO holdings(name, symbol, price, value, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *',
//   [name, symbol, price, value, amount]
// )

module.exports = {
  buyStockQuery
}
