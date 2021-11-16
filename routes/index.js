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

router.get('/stocks/buy', async (req, res) => {
  // const token = await tokenService.getAccessToken()
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
