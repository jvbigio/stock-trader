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
  // res.send(dummyData) // works
  const token = await tokenService.getAccessToken()
  // const URL = `https://sandbox.iexapis.com/stable/stock/${input}/quote?token=?${token}`
  const URL = 'https://sandbox.iexapis.com/stable/stock'

  const config = {
    params: {
      q: req.query.stock_symbol
    }
  }
  axios
    .get(URL, config)
    .then(response => res.send(response.data))
    .catch(error => {
      console.error(error)
      res.sendStatus(500).send(error)
    })
})

// router.get('/stocks/buy', async (req, res) => {
//   await res.send(TSLA) // works
// })

module.exports = router
