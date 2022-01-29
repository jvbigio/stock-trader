const express = require('express')
const app = express()
app.use(express.json())
const path = require('path')

require('dotenv').config()

const port = process.env.PORT || 3000

app.use('/', express.static(path.join(__dirname, 'client/build')))

// app.use('/api', require('./routes'))
// app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/stock'))
// app.use('/api', require('./routes/user'))

// app.use('/api', require('./routes/*'))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => console.log(`Server running on port: ${port}`))
