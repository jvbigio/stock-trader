const express = require('express')
const axios = require('axios').default
const tokenService = require('../controllers/token-service')
const dummyData = require('../DummyData')
require('dotenv').config()

const router = express.Router()

/*
IEX sandbox:

https://sandbox.iexapis.com/stable/search/tsla?token=<API_KEY>

https://sandbox.iexapis.com/stable/stock/aapl/quote?token=<API_KEY>

https://sandbox.iexapis.com/stable/ref-data/symbols?token=<API_KEY>

*/

router.get('/stocks/buy', (req, res) => {
  res.send(dummyData) // works
})

// router.get('/stocks/buy', async (req, res) => {
//   await res.send(TSLA) // works
// })

module.exports = router
