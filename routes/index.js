const express = require('express')
const axios = require('axios').default
const pool = require('../db/index')

require('dotenv').config()

const router = express.Router()

const buyQuery = require('../db/queries/transactions')

// TODO:
// create new transaction in transactions table, then run SQL statement
// ... INSERT INTO transactions <include all data> ... then return that data back
// also, ADD to holdings table
// transactions is to keep track of ALL transactions. Holdings table would be for the "Holdings Table" on portfolio page

router.get('/stocks/buy', async (req, res) => {
  const token = process.env.API_SANDBOX_KEY
  try {
    const response = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${req.query.stock_symbol}/quote?token=${token}`
    )
    await buyQuery.buyStock()
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
