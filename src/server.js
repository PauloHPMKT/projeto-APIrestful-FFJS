const express = require('express')
const cors = require('cors')

const db = require('./database')
const routes = require('./routes')

const app = express()

db.connect()

//habilitando o cors para todos os dominios, API publica
app.use(cors())


//habilita server para receber dados form json
app.use(express.json())

app.use('/api', routes)


const port = process.env.port || 8080
app.listen(port, () => console.log(`server listening on port http://localhost:${port}`))