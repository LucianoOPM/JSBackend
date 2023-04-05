const { Router } = require('express')
const router = Router()
const { ProductManager } = require('../managersDaos/proManJSON')

const Manager = new ProductManager('./src/managersDaos/products.json')



router.get("/", async (req, res) => {
    const products = await Manager.getProducts()

    res.send({ status: "ok", payload: products })
})

module.exports = router