const axios = require('axios')
require('dotenv').config()

const getAccessToken = () => {
  const token = process.env.API_SANDBOX_KEY
}

module.exports = {
  getAccessToken
}
