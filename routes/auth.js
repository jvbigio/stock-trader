const express = require('express')
const axios = require('axios').default
const pool = require('../database/db')
// app.use(express.json())
require('dotenv').config()
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')

// TODO: on client side check if user is logged in and redirect to portfolio page if they are
// TODO: also handle logged in or out status on client by showing they are logged in or not on the navbar button

// register
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    const getUser = await pool.query('SELECT * FROM users WHERE email = $1', [
      email
    ])
    // if user already exists, return error
    if (getUser.rows.length !== 0) {
      res.status(400).send({ message: 'User already exists' })
    } else {
      // if user does not exist, hash password and insert user into database
      // const saltRounds = 10
      // const hashedPassword = await bcrypt.hash(password, saltRounds) // original code
      const hashedPassword = await bcrypt.hash(password, 10) // works

      const newUser = await pool.query(
        'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *',
        [email, hashedPassword]
      )
      res.json({ newUser })
      // res.redirect('/portfolio')
    }
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

// login
// router.post('/login', (req, res) => {
//   // login user
//   const { username } = req.body
// })

module.exports = router
