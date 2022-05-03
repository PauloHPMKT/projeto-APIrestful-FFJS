const express = require('express')
const path = require('path')

const db = require('./database')
const routes = require('./routes')

db.connect()


const app = express()

//habilita server para receber dados form json
app.use(express.json())

app.use('/api', routes)


const port = process.env.port || 8080
app.listen(port, () => console.log(`server listening on port http://localhost:${port}`))