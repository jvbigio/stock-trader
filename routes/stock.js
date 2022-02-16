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
    let { name, symbol, price, value, amount, id } = req.body

    name = response.data.companyName
    symbol = response.data.symbol
    price = response.data.latestPrice
    value = price * parseInt(amount)
    id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

    // holdings table: id, name, symbol, price, value (price * quantity), quantity (inputs.shareAmount), user_id:
    const buyStock = await pool.query(
      'INSERT INTO holdings(name, symbol, price, value, quantity, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, symbol, price, value, amount, id]
    )

    res.send(buyStock.rows[0])
  } catch (err) {
    console.error(err)
    res.sendStatus(500).send(err)
  }
})

// Get all the stocks - make a separate route and call that from the client to get all the stocks per user.

// GET or POST? Originally GET, but changed to POST to test POST functionality
router.post('/stocks/user', async (req, res) => {
  //   // holdings table: id, name, symbol, price, value, quantity, created_at, user_id
  //   // user table: id: d72220bc-6844-4a97-b6b9-32303abc60a8, email: jdoe@gmail.com, password: 1234
  //   // user_id is a foreign key to the user table id
  try {
    // const { id } = req.body
    const id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

    const tableData = await pool.query(
      'SELECT * FROM holdings WHERE user_id = ($1)',
      [id]
    )

    res.send(tableData.rows)
  } catch (error) {
    res.sendStatus(500).send(error)
  }
})

// res = outgoing response, req = incoming request

module.exports = router
