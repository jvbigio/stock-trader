const express = require('express')
const axios = require('axios').default
// const tokenService = require('../controllers/token-service')
const pool = require('../database/db')

require('dotenv').config()

const router = express.Router()
const buyStock = require('../database/queries/db-stock')

// TODO:
// create new transaction in transactions table, then run SQL statement
// ... INSERT INTO transactions <include all data> ... then return that data back
// also, ADD to holdings table
// transactions is to keep track of ALL transactions. Holdings table would be for the "Holdings Table" on portfolio page

router.post('/stocks/buy', async (incomingReq, outgoingRes) => {
  const token = process.env.API_SANDBOX_KEY

  try {
    const response = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${incomingReq.query.stock_symbol}/quote?token=${token}`
    )
    let { name, symbol, price, value, amount } = incomingReq.body

    name = response.data.companyName
    symbol = response.data.symbol
    price = response.data.latestPrice
    value = price * parseInt(amount)

    // holdings table: id, name, symbol, price, value (price * quantity), quantity (inputs.shareAmount), user_id:
    // const buyStock = await pool.query(
    //   'INSERT INTO holdings(name, symbol, price, value, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *',
    //   [name, symbol, price, value, amount]
    // )

    await buyStock.buyStockQuery(name, symbol, price, value, amount)

    // outgoingRes.send(buyStock.rows[0])
    outgoingRes.send(buyStock.buyStockQuery.rows[0])
  } catch (err) {
    console.error(err)
    outgoingRes.sendStatus(500).send(err)
  }
})

// Get all the stocks - make a separate route and call that from the client to get all the stocks per user.
router.get('/stocks', async (req, res) => {
  try {
    // no users created yet, will need to refactor to select data WHERE user_id = user
    const tableData = await pool.query('SELECT * FROM holdings')

    // const holdings = tableData.rows
    // holdings.map(stock => console.log(stock)) // returns all the stocks in node

    // console.log(tableData.rows)
    res.send(tableData.rows) // original
    // res.send(holdings)
  } catch (error) {
    res.sendStatus(500).send(error)
  }
})

module.exports = router
