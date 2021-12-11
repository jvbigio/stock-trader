const pool = require('./index')

const testDB = async () => {
  try {
    const response = await pool.query('SELECT * FROM car')
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

testDB()
