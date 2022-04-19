const { response } = require('express')
const express = require('express')
const axios = require('axios').default
// const tokenService = require('../controllers/token-service')
const pool = require('../database/db')

require('dotenv').config()

const router = express.Router()

// const buyQuery = require('../database/queries/transactions')

// GET user by user_id
// router.get('/:user_id', async (req, res) => {
//   try {
//     const { user_id } = req.params
//     const response = await pool.query(
//       'SELECT * FROM holdings WHERE user_id = $1',
//       [user_id]
//     )
//     res.json(response.row)
//     console.log(response.rows)
//   } catch (err) {
//     res.status(500).send({ message: err.message })
//   }
// })

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

      res.json(buyStock.rows[0])
    } else {
      const updateStockHoldings = await pool.query(
        'UPDATE holdings SET quantity = quantity + $1, value = value + $2 WHERE symbol = $3 AND user_id = $4 RETURNING *',
        [amount, value, symbol, id]
      )
      res.json(updateStockHoldings.rows[0])
    }
  } catch (error) {
    // res.sendStatus(500).send(error)
    res.status(500).send({ message: error.message })
  }
})

router.get('/stocks/user', async (req, res) => {
  // id on user table is PK for FK user_id on holdings table
  // user_id is a foreign key to the user table id
  // id on holdings table is transaction id
  try {
    // const { symbol, price, value, quantity } = req.body
    const id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

    // render table based on user_id
    const userHoldings = await pool.query(
      'SELECT * FROM holdings WHERE user_id = ($1)',
      [id]
    )
    res.json(userHoldings.rows)
  } catch (error) {
    // res.sendStatus(500).send(error)
    res.status(500).send({ message: error.message })
  }
})

router.post('/stocks/sell', async (req, res) => {
  let { symbol, amount } = req.body
  let { user_id } = req.body
  user_id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

  // console.log(req.params) // {}
  // console.log(req.body) // { symbol: 'FB', amount: '5' }
  // console.log(req.query) // { stock_symbol: 'FB', quantity: '5' }

  // console.log(symbol, amount) // works. user entered data
  // symbol = req.query.stock_symbol
  // amount = req.query.quantity

  try {
    const isStockInHoldings = await pool.query(
      'SELECT * FROM holdings WHERE user_id = $1',
      [user_id] // user id
    )

    // amount = user entered stock quantity
    // quantity = table stock quantity

    // do i need this?
    const match = isStockInHoldings.rows.find(
      stock => stock.symbol === req.query.stock_symbol
    )
    console.log(match)
    console.log(req.query.stock_symbol)

    const newQuantity = match.quantity - amount
    const newValue = newQuantity * parseFloat(match.price).toFixed(2)

    match.quantity = newQuantity
    match.value = newValue

    // BUG: Stock deleted is the top row one, not the target stock in table
    if (match && match.quantity > 0) {
      const sellStock = await pool.query(
        'UPDATE holdings SET quantity = $1, value = $2 WHERE symbol = $3 AND user_id = $4 RETURNING *',
        [newQuantity, newValue, symbol, user_id]
      )
      res.json(sellStock.rows[0])
    } else {
      const deleteStock = await pool.query(
        'DELETE FROM holdings WHERE id = $1',
        [match.id]
        // [isStockInHoldings.rows[0].id]
      )
      res.json(deleteStock.rows[0]) // original
      // res.json(deleteStock.rows) // didn't fix bug
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
  amount = 0
})

// res = outgoing response, req = incoming request

module.exports = router
