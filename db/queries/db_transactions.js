const express = require('express')
const router = express.Router()

const pool = require('../db/index')

const buyStock = async (companyName, symbol, latestPrice) =>
  await pool.query(
    'INSERT INTO holdings(companyName, symbol, latestPrice) VALUES($1, $2, $3) RETURNING *',
    [companyName, symbol, latestPrice]
  )

module.exports = {
  buyStock
}
