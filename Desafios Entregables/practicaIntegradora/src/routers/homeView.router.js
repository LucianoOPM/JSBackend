const { Router } = require('express')
const router = Router()
const mongoManager = require('../DAO/productManagerMongo/productMMongo.js')

//const { ProductManager } = require('../DAO/productsManager/proManJSON.js')
//const path = './src/DAO/productsManager/data.json'
//const Manager = new ProductManager(path)


router.get('/products', async (req, res) => {
    try {
        let { docs } = await mongoManager.getProduct({})
        const object = {
            title: "Tienda Online",
            docs,
            style: "home.css"
        }
        res.render('home', object)
    } catch (error) {
        return res.status(500).send(error)
    }
})
router.get('/products/:pid', async (req, res) => {
    try {
        const product = await mongoManager.getProduct(req.params)
        const object = {
            pageTitle: "producto",
            product,
            style: "home.css",
            script: "viewProducts.js"
        }
        res.status(200).render('productViews', object)
    } catch (error) {
        return res.status(400).send({
            status: `ERROR`,
            error
        })
    }
})

/* router.post('/products/:pid', async (req, res) => {
    try {
        console.log(req.params)
        console.log(req.body)
        res.send({
            status: 'success'
        })
    } catch (error) {
        return res.status(400).send({
            status: `ERROR`,
            error
        })
    }
}) */
module.exports = router