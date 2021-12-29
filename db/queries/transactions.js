const express = require('express')
const router = express.Router()

const pool = require('../../db/index')

const buyStock = async (companyName, symbol, latestPrice) => {
  const buy = await pool.query(
    'INSERT INTO holdings(name, symbol, price) VALUES($1, $2, $3) RETURNING *',
    [companyName, symbol, latestPrice]
  )
  console.log(buy.rows[0])
  return buy.rows
}

module.exports = {
  buyStock
}
