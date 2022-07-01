const express = require('express')
const axios = require('axios').default
const pool = require('../database/db')
// app.use(express.json())
require('dotenv').config()
const bcrypt = require('bcrypt')
const router = express.Router()
const jwt = require('jsonwebtoken')

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
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      const newUser = await pool.query(
        'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *',
        [email, hashedPassword]
      )
      res.json(newUser.rows[0])
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
