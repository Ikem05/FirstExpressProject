
const express = require('express');
const app = express()
const people = require('./app-controller/routes')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.use('/api/people', people)


app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})

