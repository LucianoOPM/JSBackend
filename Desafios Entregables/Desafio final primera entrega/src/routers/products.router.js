const { Router } = require('express')
const router = Router()
const { ProductManager } = require('../productsManager/proManJSON')

const path = './src/productsManager/data.json'


const Manager = new ProductManager(path)


router.get("/", async (req, res) => {
    const { limit } = req.query
    const products = await Manager.getProducts(limit)
    res.send({ status: "succes", products: products })
})

router.get("/:pid", async (req, res) => {
    const { pid } = req.params
    const products = await Manager.getProductById(pid)
    res.send({ status: "succes", products: products })
})

router.post("/", async (req, res) => {
    const respuesta = await Manager.addProduct(req.body)
    const products = await Manager.getProducts()
    res.send({ status: "succes", respuesta: respuesta, products: products })
})

router.put("/:pid", async (req, res) => {
    const { pid } = req.params
    const { ...product } = req.body

    const modify = await Manager.updateProduct(pid, product)

    res.send({ status: "succes", respuesta: modify })
})

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params
    const del = await Manager.deleteProduct(pid)
    res.send({ status: "ok", respuesta: del })

})

module.exports = router