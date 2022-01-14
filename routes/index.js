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
    // const { name, symbol, price } = req.body
    // works:
    const name = response.data.companyName
    const symbol = response.data.symbol
    const price = response.data.latestPrice
    console.log(name, symbol, price)

    // holdings table: id, name, symbol, price, value (price * quantity), quantity (inputs.shareAmount), user_id:

    // const buyStock = await pool.query(
    //   'INSERT INTO holdings(name, symbol, price) VALUES($1, $2, $3) RETURNING *',
    //   [name, symbol, price]
    // )

    // res.send(buyStock.rows[0])
    res.send(response.data)
    // res.send(buyStock.rows[0])
  } catch (err) {
    console.error(err)
    res.sendStatus(500).send(err)
  }
})

module.exports = router
