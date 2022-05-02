const express = require('express')
const path = require('path')

const db = require('./database')
const routes = require('./routes')

db.connect()


const app = express()

app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)


const port = process.env.port || 8080
app.listen(port, () => console.log(`server listening on port http://localhost:${port}`))