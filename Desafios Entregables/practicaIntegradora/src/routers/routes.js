const { Router } = require('express')
const router = Router()
const views = require('./homeView.router.js')
const realtime = require('./realTimeProducts.js')
const chats = require('./chatsRouter.js')
const carts = require('./cartsRouter.js')
const users = require('./usersRouter.js')

router.use('/api/', views)
router.use('/api/realtimeproducts', realtime)
router.use('/api/chat', chats)
router.use('/api/carts', carts)
router.use('/api/users/', users)

module.exports = router