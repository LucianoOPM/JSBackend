const { Router } = require('express')
const router = Router()
const views = require('./homeView.router.js')
const realtime = require('./realTimeProducts.js')
const chats = require('./chatsRouter.js')
const carts = require('./cartsRouter.js')

router.use('/home', views)
router.use('/realtimeproducts', realtime)
router.use('/chat', chats)
router.use('/carts', carts)

module.exports = router