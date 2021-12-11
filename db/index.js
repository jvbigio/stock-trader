const express = require('express')

const { Pool } = require('pg')

require('dotenv').config()

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
})

pool
  .connect()
  .then(() => console.log(`Connected to database: ${process.env.DB_NAME}`))
  .catch(err => console.error(err))

module.exports = pool
