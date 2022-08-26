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
      const hashedPassword = await bcrypt.hash(password, 10)

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

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body
  // console.log(email, password) // works

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email
    ])
    if (user.rows.length === 0) {
      return res.status(400).send({ message: 'User does not exist' })
    }
    // if user exists, compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.rows[0].password
    )

    if (!isPasswordValid) {
      return res.status(400).send({ message: 'Incorrect password' })
    }

    const token = jwt.sign(
      { user: user.rows[0] },
      process.env.ACCESS_TOKEN_SECRET
    )
    // send token and email to client
    res.json({ token, email })
  } catch (err) {
    // res.status(500).send({ message: err.message })
    // res.sendStatus(500)
    res.json(err.message)
  }
})

module.exports = router
