const express = require('express')
const axios = require('axios').default
const tokenService = require('../controllers/token-service')

require('dotenv').config()

const router = express.Router()

// Dummy Data
// HTTP REQUEST

// GET /search/{fragment}
// GET /search/tsla

/* IEX sandbox: https://sandbox.iexapis.com/stable/search/tsla?token=Tpk_3bc2802cc8fe46b6aff7cc63e23ca4fc
*/

const TSLA =
  [
    {
      symbol: 'TSLA-SE',
      cik: '0001318605',
      securityName: '',
      securityType: 'SHARE',
      region: 'CH',
      exchange: 'SWX',
      sector: 'Manufacturing'
    },
    {
      symbol: 'TSLA-RM-RX',
      cik: '0001318605',
      securityName: '',
      securityType: 'SHARE',
      region: 'RU',
      exchange: 'MIC',
      sector: 'Manufacturing'
    },
    {
      symbol: 'TSLA-MM',
      cik: '0001318605',
      securityName: '',
      securityType: 'SHARE',
      region: 'MX',
      exchange: 'MEX',
      sector: 'Manufacturing'
    },
    {
      symbol: 'TSLA-AV',
      cik: '0001318605',
      securityName: '',
      securityType: 'SHARE',
      region: 'AT',
      exchange: 'WBO',
      sector: 'Manufacturing'
    },
    {
      symbol: 'TSLA',
      cik: '0001318605',
      securityName: 'Tesla Inc',
      securityType: 'SHARE',
      region: 'US',
      exchange: 'NAS',
      sector: 'Manufacturing'
    },
    {
      symbol: 'TSLTF',
      cik: '0001144800',
      securityName: '',
      securityType: 'PREF',
      region: 'US',
      exchange: 'PINX',
      sector: 'Utilities'
    },
    {
      symbol: 'TSLX',
      cik: '0001508655',
      securityName: 'Sixth Street Specialty Lending Inc',
      securityType: 'SHARE',
      region: 'US',
      exchange: 'NYS',
      sector: 'Finance and Insurance'
    },
    {
      symbol: 'TSLLF',
      cik: null,
      securityName: '',
      securityType: 'SHARE',
      region: 'US',
      exchange: 'PINX',
      sector: 'Manufacturing'
    },
    {
      symbol: 'TSL.ZW-ZH',
      cik: null,
      securityName: 'TSL Limited',
      securityType: 'SHARE',
      region: 'ZW',
      exchange: 'ZIM',
      sector: 'Management of Companies and Enterprises'
    }
  ]

// router.get('/stocks/buy', async (req, res) => {
router.get('/portfolio', async (req, res) => {
  res.send('Request Received!')
})

module.exports = router
