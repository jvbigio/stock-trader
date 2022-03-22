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
  let { name, symbol, price, value, amount, id } = req.body
  // const { transactionID } = req.query
  id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

  try {
    // check if holdings table stock amount is greater than 0, if so update, if not delete
    const isStockInHoldings = await pool.query(
      'SELECT * FROM holdings WHERE symbol = $1 AND user_id = $2',
      [symbol, id] // user enters
    )
    // first check holdings table stock quantity is greater than 0
    if (isStockInHoldings.rows[0].quantity > 0) {
      // if so, update holdings table stock quantity and value
      const updateStockHoldings = await pool.query(
        'UPDATE holdings SET quantity = quantity - $1, value = value - $2 WHERE symbol = $3 AND user_id = $4 RETURNING *',
        [amount, value, symbol, id]
      )
      res.send(updateStockHoldings.rows[0])
    } else {
      // if not, delete stock from holdings table
      const deleteStockHoldings = await pool.query(
        'DELETE FROM holdings WHERE symbol = $1 AND user_id = $2 RETURNING *',
        [symbol, id]
      )
      res.send(deleteStockHoldings.rows[0])
    }
  } catch (error) {
    // res.sendStatus(500).send(error)
    // res.send(error)
    res.status(500).send({ message: error.message })
    // res.json({ token, email });
    //   } catch (err) {
    //     res.status(500).send({ message: err.message });
    //   }
    // });
  }
})

// res = outgoing response, req = incoming request

module.exports = router
