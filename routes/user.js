const express = require('express')
const axios = require('axios').default
const pool = require('../database/db')

require('dotenv').config()

const router = express.Router()

// GET user by user_id
// route for cash balance based on user_id
// /user/:user_id/balance
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

    for (const stock of response.rows) {
      stockValue += stock.quantity * stock.price
    }
    // res.json(response.rows[0])
    console.log(userCashBalance)
    res.json({ userCashBalance: userCashBalance - stockValue, stockValue })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// show Alert in BuyModal when userCashBalance insufficient, hide when userCashBalance sufficient

// example:
// userCashBalance > stockPrice * stockAmount ? hideAlert : showAlert

module.exports = router
