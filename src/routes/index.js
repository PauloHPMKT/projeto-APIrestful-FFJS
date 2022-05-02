const router = require('express').Router()

router.get('/clientes', (req, res) => {
    res.send({
        testando: 'Testando API com Postman'
    })
})

module.exports = router