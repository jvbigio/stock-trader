const express = require('express')
const axios = require('axios').default
const pool = require('../database/db')

require('dotenv').config()

const router = express.Router()

// router.get('/cash/:user_id', async (req, res) => { // use this when registration works
router.get('/cash', async (req, res) => {
  try {
    const userCashBalance = 100000
    let stockValue = 0
    // const { user_id } = req.params // for when registration works
    const id = 'd72220bc-6844-4a97-b6b9-32303abc60a8'

    const response = await pool.query(
      'SELECT * FROM holdings WHERE user_id = ($1)',
      [id]
    )
    // works:
    // for (const stock of response.rows) {
    //   stockValue += stock.quantity * stock.price
    // }

    response.rows.map(stock => ({
      ...stock,
      stockValue: (stockValue += stock.quantity * stock.price)
    }))

    // maybe do conditional if buy or sell to add or subtract from cash balance
    // if buy, subtract cash balance
    res.json({ userCashBalance: userCashBalance - stockValue, stockValue })
    // else, add cash balance
    // res.json({ userCashBalance: userCashBalance + stockValue, stockValue })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// show Alert in BuyModal when userCashBalance insufficient, hide when userCashBalance sufficient

// example:
// userCashBalance > stockPrice * stockAmount ? hideAlert : showAlert

module.exports = router
