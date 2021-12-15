const express = require('express')
const axios = require('axios').default
const pool = require('../db/index')

require('dotenv').config()

const router = express.Router()

// create new transaction in transaction table, then run SQL statement
// ... INSERT INTO transaction <include all data> ... then return that data back
router.get('/stocks/buy', async (req, res) => {
  const token = process.env.API_SANDBOX_KEY
  try {
    const response = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/${req.query.stock_symbol}/quote?token=${token}`
    )
    res.send(response.data)
  } catch (err) {
    console.error(err)
    res.sendStatus(500).send(err)
  }
})

module.exports = router
