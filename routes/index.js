const express = require('express')
const axios = require('axios').default
const tokenService = require('../controllers/token-service')
const dummyData = require('../DummyData')
require('dotenv').config()

const router = express.Router()

/* IEX sandbox: https://sandbox.iexapis.com/stable/search/tsla?token=Tpk_3bc2802cc8fe46b6aff7cc63e23ca4fc
 */

router.get('/stocks/buy', (req, res) => {
  res.send(dummyData) // works
})

// router.get('/stocks/buy', async (req, res) => {
//   await res.send(TSLA) // works
// })

module.exports = router
