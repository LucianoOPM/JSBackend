const { Router } = require('express')
const router = Router()
const mongoManager = require('../DAO/productManagerMongo/productMMongo.js')

//const { ProductManager } = require('../DAO/productsManager/proManJSON.js')
//const path = './src/DAO/productsManager/data.json'
//const Manager = new ProductManager(path)


router.get('/', async (req, res) => {
    try {
        const products = await mongoManager.getProduct()

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

module.exports = router 