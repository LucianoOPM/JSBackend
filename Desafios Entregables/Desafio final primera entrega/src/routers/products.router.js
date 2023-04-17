const { Router } = require('express')
const router = Router()
const { ProductManager } = require('../productsManager/proManJSON')

const path = './src/productsManager/data.json'


const Manager = new ProductManager(path)


router.get("/", async (req, res) => {
    try {
        const { limit } = req.query
        const products = await Manager.getProducts(limit)
        res.send({ status: "succes", products: products })
    } catch (error) {
        return res.send({ status: "error", error: error.message })
    }

})

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const products = await Manager.getProductById(pid)
        res.send({ status: "succes", products: products })
    } catch (error) {
        return res.send({ status: "error", error: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const respuesta = await Manager.addProduct(req.body)
        const products = await Manager.getProducts()
        res.send({ status: "succes", respuesta: respuesta, products: products })

    } catch (error) {
        return res.send({ status: "error", error: error.message })
    }
})

router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const { ...product } = req.body

        const modify = await Manager.updateProduct(pid, product)

        res.send({ status: "succes", respuesta: modify })
    } catch (error) {
        return res.send({ status: "error", error: error.message })
    }

})

router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const del = await Manager.deleteProduct(pid)
        res.send({ status: "ok", respuesta: del })
    } catch (error) {
        return res.send({ status: "error", error: error.message })
    }
})

module.exports = router