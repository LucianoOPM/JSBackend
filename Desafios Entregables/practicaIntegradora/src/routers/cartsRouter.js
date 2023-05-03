const { Router } = require('express')
const router = Router()
const Manager = require('../DAO/productManagerMongo/cartManagerM.js')

router.post('/', async (req, res) => {
    try {
        const test = await Manager.newCart(req.body)
        res.send({
            status: 'success',
            payload: test
        })
    } catch (error) {
        return console.log(`ERROR: ${error}`)
    }
})

router.get('/', async (req, res) => {
    try {
        const getCarts = await Manager.getCarts(req.query)

        res.send({
            status: 'success',
            payload: getCarts
        })
    } catch (error) {
        return console.log(`ERROR: ${error}`)
    }
})

router.put('/:cid/product/:pid', async (req, res) => {
    try {
        const addProduct = await Manager.addProductInCart(req.params)

        res.send({
            status: 'success',
            payload: addProduct
        })
    } catch (error) {
        return console.log(`ERROR: ${error}`)
    }
})

router.delete('/:cid', async (req, res) => {
    try {

        const delCart = await Manager.delCart(req.params)

        res.send({
            status: 'success',
            payload: delCart
        })
    } catch (error) {
        return console.log(`ERROR: ${error}`)
    }
})

module.exports = router