const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME
})

const execute = async () => {
  try {
    await client.connect()
    console.log('Connected successfully...')
    const results = await client.query('SELECT * FROM car')
    console.log(results)
    await client.end()
    console.log('Client disconnected...')
  } catch (err) {
    console.error(err)
  }
}

execute()
