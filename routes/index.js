const express = require('express')
const axios = require('axios').default
// const tokenService = require('../controllers/token-service')
const pool = require('../database/db')

require('dotenv').config()

const router = express.Router()

// const buyQuery = require('../database/queries/transactions')

// TODO:
// create new transaction in transactions table, then run SQL statement
// ... INSERT INTO transactions <include all data> ... then return that data back
// also, ADD to holdings table
// transactions is to keep track of ALL transactions. Holdings table would be for the "Holdings Table" on portfolio page

// GET API data
router.get('/stocks/buy', async (req, res) => {
  const token = process.env.API_SANDBOX_KEY

  try {
    const response = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${req.query.stock_symbol}/quote?token=${token}`
    )

    res.send(response.data)
  } catch (error) {
    res.sendStatus(500).send(error)
  }
})

// INSERT API data into database
router.post('/stocks/buy', async (req, res) => {
  // const { stockData } = req.body
  // const { name, symbol, price } = req.body
  try {
    // table columns: id, name, symbol, price, value, quantity, created_at, user_id
    // IEX API: companyName, symbol, latestPrice
    const buyStock = (name, symbol, price) =>
      // const { name, symbol, price } = req.body
      pool.query(
        'INSERT INTO holdings(name, symbol, price) VALUES($1, $2, $3) RETURNING *',
        [name, symbol, price]
      )
    // res.send(response.data) // orig
    res.json(buyStock.rows[0]) // testing
  } catch (err) {
    console.error(err)
    res.sendStatus(500).send(err)
  }
})

module.exports = router
