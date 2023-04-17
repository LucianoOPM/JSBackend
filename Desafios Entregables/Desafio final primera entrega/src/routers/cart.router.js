const { Router } = require('express')
const router = Router()
const { CartManager } = require('../productsManager/cartManager.js')
const { ProductManager } = require('../productsManager/proManJSON.js')


const cartPath = "./src/productsManager/cart.json"
const productsPath = "./src/productsManager/data.json"

const Manager = new CartManager(cartPath)
const productManager = new ProductManager(productsPath)


router.post("/", async (req, res) => {
    try {
        const newCart = await Manager.newCart()
        res.send({ status: "succes", mesagge: newCart })

    } catch (error) {
        return res.send({ status: "error", message: error.message })
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const test = await Manager.previewCart(cid)

        res.send({ status: "succes", idCart: cid, products: test })
    } catch (error) {
        return res.send({ status: "error", message: error.message })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params
        const products = await productManager.getProductById(pid)
        const added = await Manager.addToCart(cid, products)
        res.send({ status: "succes", pid: pid, cart: added })
    } catch (error) {
        return res.send({ status: "error", message: error.message })
    }
})

module.exports = router