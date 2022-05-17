const express = require('express')
const axios = require('axios').default
const pool = require('../database/db')

require('dotenv').config()

const router = express.Router()

// GET user by user_id
// route for cash balance based on user_id
// /user/:user_id/balance
router.get('/:user_id/balance', async (req, res) => {
  try {
    const { user_id } = req.params
    const response = await pool.query('SELECT cash FROM users WHERE id = $1', [
      user_id
    ])
    res.json(response.rows[0])
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// show Alert in BuyModal when userCashBalance insufficient, hide when userCashBalance sufficient

// example:
// userCashBalance > stockPrice * stockAmount ? hideAlert : showAlert

module.exports = router
