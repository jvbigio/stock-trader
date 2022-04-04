const { response } = require('express')
const express = require('express')
const axios = require('axios').default
// const tokenService = require('../controllers/token-service')
const pool = require('../database/db')

require('dotenv').config()

const router = express.Router()

// const buyQuery = require('../database/queries/transactions')

// TESTING: Change all instances of 'amount' to 'quantity'

router.post('/stocks/buy', async (req, res) => {
  const token = process.env.API_SANDBOX_KEY

  try {
    const response = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${req.query.stock_symbol}/quote?token=${token}`
    )

    let { name, symbol, price, value, quantity, id } = req.body
    name = response.data.companyName
    symbol = response.data.symbol
    price = response.data.latestPrice
    value = price * quantity
    id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

    const isStockInHoldings = await pool.query(
      'SELECT * FROM holdings WHERE symbol = $1 AND user_id = $2',
      [symbol, id]
    )

    if (!isStockInHoldings.rows.length) {
      const buyStock = await pool.query(
        'INSERT INTO holdings(name, symbol, price, value, quantity, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, symbol, price, value, quantity, id]
      )

      res.send(buyStock.rows[0])
    } else {
      const updateStockHoldings = await pool.query(
        'UPDATE holdings SET quantity = quantity + $1, value = value + $2 WHERE symbol = $3 AND user_id = $4 RETURNING *',
        [quantity, value, symbol, id]
      )
      res.send(updateStockHoldings.rows[0])
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

router.get('/stocks/user', async (req, res) => {
  //   // user_id is a foreign key to the user table id
  try {
    // const id = 'd72220bc-6844-4a97-b6b9-32303abc60a8' // original
    const user_id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

    // render table based on user_id
    const userHoldings = await pool.query(
      'SELECT * FROM holdings WHERE user_id = ($1)',
      [user_id]
    )
    res.send(userHoldings.rows)
  } catch (error) {
    // res.sendStatus(500).send(error)
    res.status(500).send({ message: error.message })
  }
})

router.post('/stocks/sell', async (req, res) => {
  // price is stock price/share. value is price * quantity

  // let { name, symbol, price, value, amount, id } = req.body // org
  const { name, symbol, price, value, quantity, user_id } = req.body
  // const { amount } = req.body
  // let { name, symbol, price, value, user_id } = req.body
  // let { quantity } = req.query // amount entered by user
  // console.log(symbol, quantity)
  // const updatedValue = parseInt(quantity) - parseInt(quantity)
  // console.log(updatedValue)

  // symbol = req.query.stock_symbol
  // quantity = req.query.quantity
  // amount = req.query.quantity
  // console.log(symbol, quantity) // entered by user
  // id is user_id
  // id = 'd72220bc-6844-4a97-b6b9-32303abc60a8' // keep

  try {
    // check if holdings table stock amount is greater than 0, if so update, if not delete
    const isStockInHoldings = await pool.query(
      'SELECT * FROM holdings WHERE symbol = $1 AND user_id = $2',
      [symbol, user_id] // user entered data
    )
    console.log(isStockInHoldings.rows[0].amount)
    // console.log(isStockInHoldings.rows[0].quantity) // from table
    if (isStockInHoldings.rows[0].quantity > quantity) {
      const updateStockHoldings = await pool.query(
        'UPDATE holdings SET quantity = quantity - $1, value = value - $2 WHERE symbol = $3 AND user_id = $4 RETURNING *',
        [quantity, value, symbol, user_id]
      )

      res.send(updateStockHoldings.rows[0])
    } else if (updatedValue === 0) {
      // if so, delete table row
      const deleteStockHoldings = await pool.query(
        'DELETE FROM holdings WHERE id = $1',
        [isStockInHoldings.rows[0].id]
      )
      res.send(deleteStockHoldings.rows[0])
    }
  } catch (error) {
    res.send(error.message)
  }
})

// res = outgoing response, req = incoming request

module.exports = router
