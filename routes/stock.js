const { response } = require('express')
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
    value = parseInt(price) * parseInt(amount)
    id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

    // ck if record exists in holdings table
    const checkExists = await pool.query(
      'SELECT * FROM holdings WHERE symbol = $1 AND user_id = $2',
      [symbol, id]
    )
    console.log(checkExists.rows)
    console.log(checkExists.rows.length)
    console.log(checkExists)
    console.log(checkExists.rows[0])

    checkExists.rows.map(stock => {
      const exists = stock.symbol.includes(req.query.stock_symbol.toUpperCase())
      console.log(exists)
      if (exists) {
        // update holdings table
        console.log(`${stock.symbol} already exists`)
      } else {
        // insert into holdings table
        console.log(`${stock.symbol} does not exist`)
      }
      // return stock.symbol.includes(req.stock_symbol.toUpperCase())
    })

    res.send(checkExists.rows)

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

router.get('/stocks/user', async (req, res) => {
  //   // user_id is a foreign key to the user table id
  try {
    // const { symbol, price, value, quantity } = req.body
    const id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

    const userHoldings = await pool.query(
      'SELECT * FROM holdings WHERE user_id = ($1)',
      [id]
    )

    res.send(userHoldings.rows)
  } catch (error) {
    res.sendStatus(500).send(error)
  }
})

// res = outgoing response, req = incoming request

module.exports = router
