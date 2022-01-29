const express = require('express')
const axios = require('axios').default
const pool = require('../database/db')

require('dotenv').config()

const router = express.Router()

module.exports = router
