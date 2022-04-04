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

    console.log(response)

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
    // res.sendStatus(500).send(error)
    res.status(500).send({ message: error.message })
  }
})

router.get('/stocks/user', async (req, res) => {
  //   // user_id is a foreign key to the user table id
  try {
    // const { symbol, price, value, quantity } = req.body
    const id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

    // render table based on user_id
    const userHoldings = await pool.query(
      'SELECT * FROM holdings WHERE user_id = ($1)',
      [id]
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
  let { name, symbol, price, value, amount, user_id } = req.body

  symbol = req.query.stock_symbol
  amount = req.query.quantity

  // id is user_id
  // id = 'd72220bc-6844-4a97-b6b9-32303abc60a8' // keep

  try {
    // check if holdings table stock amount is greater than 0, if so update, if not delete
    const isStockInHoldings = await pool.query(
      'SELECT * FROM holdings WHERE symbol = $1 AND user_id = $2',
      [symbol, user_id] // user entered data
    )

    const updatedValue =
      parseInt(isStockInHoldings.rows[0].quantity) - parseInt(quantity)
    console.log(updatedValue)

    // console.log(isStockInHoldings.rows[0].quantity) // from table
    // console.log(isStockInHoldings.rows[0].amount) // undefined
    // amount = typeof number
    // if (isStockInHoldings.rows[0].quantity > 0) { // original
    if (isStockInHoldings.rows[0].quantity > amount) {
      // if so, update holdings table stock quantity and value

      const updateStockHoldings = await pool.query(
        'UPDATE holdings SET quantity = quantity - $1, value = value - $2 WHERE symbol = $3 AND user_id = $4 RETURNING *',
        [amount, value, symbol, user_id]
        // [amount, value, symbol, id]
      )

      res.send(updateStockHoldings.rows[0])
      // if table value = amount entered in input, delete table row
      // } else if (isStockInHoldings.rows[0].quantity <= 0) { // orig
      // testing, was just else
      // if table quantity is less than amount entered in input, delete table row
      // } else if (isStockInHoldings.rows[0].quantity <= amount) {
    } else if (updatedValue === 0) {
      // if so, delete table row
      const deleteStockHoldings = await pool.query(
        // if user enters more than or equal to amount in table, delete row
        // 'DELETE FROM holdings WHERE symbol = $1 AND user_id = $2 RETURNING *',
        // [symbol, id]
        'DELETE FROM holdings WHERE id = $1',
        [isStockInHoldings.rows[0].id]
      )
      res.send(deleteStockHoldings.rows[0])
    }
  } catch (error) {
    // res.sendStatus(500).send(error)
    res.send(error.message)
    // res.status(500).send({ message: error.message })
    // res.json({ token, email });
    //   } catch (err) {
    //     res.status(500).send({ message: err.message });
    //   }
    // });
  }
})

// res = outgoing response, req = incoming request

module.exports = router
