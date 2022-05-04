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

async function put(req, res) {
    const { id } = req.params

    const product = await ProductsModel.findByIdAndUpdate({ _id: id }, req.body, { new: true })

    /* trecho de código para atualizar produto
    const product = await ProductsModel.findById({ _id: id })

    await product.updateOne(req.body) // atualiza tudo 
    */
    res.send({
        messennge: 'success',
        product,
    })

}


module.exports = {
    get,
    post,
    put,
}   