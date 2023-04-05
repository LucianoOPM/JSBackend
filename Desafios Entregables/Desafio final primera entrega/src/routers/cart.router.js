const { Router } = require('express')
const router = Router()
const { CartManager } = require('../productsManager/cartManager.js')

const path = "./src/productsManager/cart.json"

const Manager = new CartManager(path)


router.post("/", async (req, res) => {
    const newCart = await Manager.newCart()
    res.send({ status: "succes", mesagge: newCart })
})

router.get("/:cid", async (req, res) => {

    const { cid } = req.params
    const test = await Manager.previewCart(cid)

    res.send({ status: "succes", idCart: cid, products: test })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params

    console.log(await Manager.addToCart(cid, pid))
    res.send({ status: "succes", pid: pid })
})

module.exports = router