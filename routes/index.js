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
  const token = await tokenService.getAccessToken()

  const URL = `https://sandbox.iexapis.com/stable/stock/${stock_symbol}/quote?token=${token}`

  axios
    .get(URL)
    .then(response => res.send(response.data))
    .catch(error => {
      console.error(error)
      res.sendStatus(500).send(error)
    })
})

module.exports = router
