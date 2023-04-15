const { Router } = require('express')
const router = Router()
const { ProductManager } = require('../productsManager/proManJSON')
const path = './src/productsManager/data.json'

const Manager = new ProductManager(path)


router.get('/', async (req, res) => {
    const products = await Manager.getProducts()

    const object = {
        title: "Tienda Online",
        products,
        style: "home.css"
    }
    res.render('home', object)
})

router.get('/realtimeproducts', async (req, res) => {
    const object = {
        title: "Agregar productos",
        script: "main.js",
        style: "products.css"
    }
    res.render('realtimeproducts', object)
})

module.exports = router