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

router.post('/stocks/buy', async (req, res) => {
  const token = process.env.API_SANDBOX_KEY
  try {
    const response = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${req.query.stock_symbol}/quote?token=${token}`
    )
    const { stockData } = req.body
    // await buyQuery.buyStock(companyName, symbol, latestPrice)

    // const buyStock = (companyName, symbol, latestPrice) => pool.query(
    //   'INSERT INTO holdings(companyName, symbol, latestPrice) VALUES($1, $2, $3) RETURNING *', [companyName, symbol, latestPrice]
    // )

    res.send(response.data)
  } catch (err) {
    console.error(err)
    res.sendStatus(500).send(err)
  }
})

module.exports = router
