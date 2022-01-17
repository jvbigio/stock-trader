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
    let { name, symbol, price, value, amount } = req.body

    name = response.data.companyName
    symbol = response.data.symbol
    price = response.data.latestPrice
    value = price * parseInt(amount)
    // console.log(name, symbol, price, amount, value) // works

    // holdings table: id, name, symbol, price, value (price * quantity), quantity (inputs.shareAmount), user_id:
    const buyStock = await pool.query(
      'INSERT INTO holdings(name, symbol, price, value, quantity) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [name, symbol, price, value, amount]
    )

    res.send(buyStock.rows[0])
  } catch (err) {
    console.error(err)
    res.sendStatus(500).send(err)
  }
})

// Get all the stocks - make a separate route and call that from the client to get all the stocks per user.
// router.get('/stocks', async (req, res) => {
//   try {
//     // no users created yet, will need to refactor to select data WHERE user_id = user
//     const tableData = await pool.query('SELECT * FROM holdings')
//     res.send(tableData.rows)
//   } catch (error) {
//     res.sendStatus(500).send(error)
//   }
// })

module.exports = router
