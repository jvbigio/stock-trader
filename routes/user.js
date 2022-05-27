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
    const { user_id } = req.params
    const response = await pool.query('SELECT cash FROM users WHERE id = $1', [
      user_id
    ])

    for (const stock of response.rows) {
      stockValue += stock.amount * stock.price
    }
    // res.json(response.rows[0])
    res.json({ userCashBalance: userCashBalance - stockValue, stockValue })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// show Alert in BuyModal when userCashBalance insufficient, hide when userCashBalance sufficient

// example:
// userCashBalance > stockPrice * stockAmount ? hideAlert : showAlert

module.exports = router
