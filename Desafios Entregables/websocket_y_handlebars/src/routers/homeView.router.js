const { Router } = require('express')
const router = Router()
const { ProductManager } = require('../productsManager/proManJSON')
const path = './src/productsManager/data.json'

const Manager = new ProductManager(path)


router.get('/', async (req, res) => {
    try {
        const products = await Manager.getProducts()

        const object = {
            title: "Tienda Online",
            products,
            style: "home.css"
        }
        res.render('home', object)
    } catch (error) {
        return res.status(500).send(error)
    }

})

router.get('/realtimeproducts', (req, res) => {
    const object = {
        title: "Agregar productos",
        script: "main.js",
        style: "products.css"
    }
    res.render('realtimeproducts', object)
})

module.exports = router