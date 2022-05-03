const ProductsModel = require('../models/products')

async function get(req, res) {

    const { id } = req.params
    
    const objeto = id ? { _id: id } : null  

    const products = await ProductsModel.find(objeto) //listar todos os proddutos
    
    res.send(products)
}

async function post(req, res) {
    const {
        name,
        brand,
        price,
    } = req.body

    const product = new ProductsModel({
        name,
        brand,
        price,
    })

    product.save()

    res.send({
        messenge: 'sucess'
    })
}

module.exports = {
    get,
    post,
}   