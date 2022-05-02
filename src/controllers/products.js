const ProductsModel = require('../models/products')

async function get(req, res) {
    
    const products = await ProductsModel.find() //listar todos os proddutos
    
    res.send(products)
}

module.exports = {
    get,
}   