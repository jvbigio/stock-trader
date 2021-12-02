const { Client } = require('pg')
require('dotenv').config()

const client = new Client({
  user: 'postgres',
  password: process.env.PGPASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'test'
})

const execute = async () => {
  try {
    await client.connect()
    console.log('Connected successfully...')
    const results = await client.query('SELECT * FROM car')
    // console.table(results.rows)
    console.log(results)
    await client.end()
    console.log('Client disconnected...')
  } catch (err) {
    console.error(err)
  }
}

execute()
