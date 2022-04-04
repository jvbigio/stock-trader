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
  let { symbol, price, value, amount, user_id } = req.body
  user_id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'
  // const { amount } = req.query
  // console.log(req.params) // {}
  // console.log(req.body) // { symbol: 'FB', amount: '5' }
  // console.log(req.query) // { stock_symbol: 'FB', quantity: '5' }
  // console.log(res.body) // undefined

  // price is stock price/share. value is price * quantity
  // amount is the number of shares to sell
  // id is the id of the stock to sell, not user_id
  // const { name, symbol, price, value, amount, id } = req.body

  // console.log(symbol, amount) // works. user entered data
  // symbol = req.query.stock_symbol
  // amount = req.query.quantity
  // console.log(symbol, price, value, quantity, user_id, amount) // symbol/amount work

  try {
    // check if holdings table stock amount is greater than 0, if so update, if not delete
    const isStockInHoldings = await pool.query(
      // 'SELECT * FROM holdings WHERE symbol = $1 AND user_id = $2',
      // [symbol, id] // user entered data
      'SELECT * FROM holdings WHERE user_id = $1',
      [user_id] // user id
    )
    // console.log(isStockInHoldings.rows[0].quantity >= 200)
    // console.log(!isStockInHoldings.rows[0].symbol)

    // amount = user entered stock quantity
    // quantity = table stock quantity

    const match = isStockInHoldings.rows.find(
      stock => stock.symbol === req.query.stock_symbol
    )
    // const { quantity, value } = isStockInHoldings.rows[0]
    // const newQuantity = parseInt(match.quantity) - parseInt(amount)
    // const newValue = parseInt(value) - parseInt(price) * parseInt(amount
    const newQuantity = match.quantity - amount // works
    let newValue = newQuantity * parseFloat(match.price).toFixed(2)

    console.log(
      `Price: ${match.price}. Updated quantity: ${newQuantity}, value: ${newValue}`
    )
    // console.log(isStockInHoldings.rows[0].value) // first row value
    // console.log(typeof match.value) // string
    // console.log(match.value) // returns value on table

    // table quantity, table symbol, user entered quantity:
    console.log(match.quantity, match.symbol, amount) // works
    if (match && match.quantity > 0) {
      const sellStock = await pool.query(
        'UPDATE holdings SET quantity = quantity - $1, value = value - $2 WHERE symbol = $3 AND user_id = $4 RETURNING *',
        [match.quantity, newValue, symbol, user_id]
        // [amount, newValue, symbol, user_id] // works except value
      )
      res.json(sellStock.rows[0])
      // res.json(sellStock.rows)
      // newValue = sellStock.rows[0].value
      console.log(newValue)
      // based on 100 stocks - 99 stocks:
      console.log(sellStock.rows[0].value) // not working..
      console.log(isStockInHoldings.rows[0].value) // not working..
      // when 1 stock in table it shows in value (99 stocks value), not 1 stock value
    } else {
      // const deleteStock = await pool.query(
      //   // 'DELETE FROM holdings WHERE symbol = $1 AND user_id = $2 RETURNING *',
      //   // [symbol, user_id]
      //   'DELETE FROM holdings WHERE id = $1',
      //   [isStockInHoldings.rows[0].id]
      //   // 'DELETE FROM holdings WHERE symbol = $1',
      //   // [symbol]
      // )
      // res.json(deleteStock.rows[0])
    }
  } catch (error) {
    // res.sendStatus(500).send(error)
    res.status(500).send({ message: error.message })
  }
})

//   const { quantity, value } = isStockInHoldings.rows[0]
//   const newQuantity = quantity - amount
//   const newValue = value - price * amount
//   // const newQuantity = isStockInHoldings.rows[0].quantity - quantity
//   // const newValue = value - price * quantity
//   console.log(newQuantity, newValue)

//   if (newQuantity > 0) {
//     const updateStockHoldings = await pool.query(
//       'UPDATE holdings SET quantity = $1, value = $2 WHERE symbol = $3 AND user_id = $4 RETURNING *',
//       [newQuantity, newValue, symbol, user_id]
//     )
//     res.json(updateStockHoldings.rows[0])
//   } else {
//     const deleteStockHoldings = await pool.query(
//       'DELETE FROM holdings WHERE symbol = $1 AND user_id = $2 RETURNING *',
//       [symbol, user_id]
//     )
//     res.json(deleteStockHoldings.rows[0])
//   }
// } else {
//   res.status(404).send({ message: 'Stock not found' })
// }
//   } catch (error) {
//     // res.sendStatus(500).send(error)
//     res.status(500).send({ message: error.message })
//   }
// })

// res = outgoing response, req = incoming request

module.exports = router
