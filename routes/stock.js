const { response } = require('express')
const express = require('express')
const axios = require('axios').default
// const tokenService = require('../controllers/token-service')
const pool = require('../database/db')

require('dotenv').config()

const router = express.Router()

// const buyQuery = require('../database/queries/transactions')

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
    value = price * amount
    id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

    const isStockInHoldings = await pool.query(
      'SELECT * FROM holdings WHERE symbol = $1 AND user_id = $2',
      [symbol, id]
    )

    if (!isStockInHoldings.rows.length) {
      const buyStock = await pool.query(
        'INSERT INTO holdings(name, symbol, price, value, quantity, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, symbol, price, value, amount, id]
      )

      res.send(buyStock.rows[0])
    } else {
      const updateStockHoldings = await pool.query(
        'UPDATE holdings SET quantity = quantity + $1, value = value + $2 WHERE symbol = $3 AND user_id = $4 RETURNING *',
        [amount, value, symbol, id]
      )
      res.send(updateStockHoldings.rows[0])
    }
  } catch (error) {
    res.sendStatus(500).send(error)
  }
})

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

router.post('/stocks/sell', async (req, res) => {
  const { name, symbol, price, value, amount, id } = req.body
  // const { transactionID } = req.query

  try {
    // if stocks reach 0 delete from holdings:
    // > than amount in table, amount = 2
    // amount.length < or = amount in table = 1
    // fix when amount is 0, don't allow that
    console.log(amount, !amount, amount.length, amount === '0')
    // console.log(id)

    if (!amount) {
      const deleteStock = await pool.query(
        // 'DELETE FROM holdings WHERE symbol = $1 AND user_id = $2 RETURNING *',
        // 'DELETE FROM holdings WHERE symbol = $1 AND id = $2',
        // [symbol, id]
        // testing.. deletes entire row, not just the quantity:
        'DELETE FROM holdings WHERE symbol = $1',
        [symbol]
        // end testing
        // id is transaction id NOT user_id
        // [symbol, transactionID]
      )
      res.send(deleteStock.rows[0])
      // res.send(deleteStock.rows[0].symbol)
    } else {
      const updateStockHoldings = await pool.query(
        // 'UPDATE holdings SET quantity = quantity - $1, value = value - $2 WHERE symbol = $3 AND user_id = $4 RETURNING *',
        // [quantity, value, symbol, id]
        'UPDATE holdings SET quantity = quantity - $1, value = value - $2 WHERE symbol = $3 AND id = $4 RETURNING *',
        [amount, value, symbol, id]
      )
      res.send(updateStockHoldings.rows[0])
    }
  } catch (error) {
    res.sendStatus(500).send(error)
  }
})

// res = outgoing response, req = incoming request

module.exports = router
