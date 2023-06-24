const { Router } = require('express')
const router = Router()
/* 
Deprecated
const views = require('./views.router.js')
const realtime = require('./realTimeProducts.js')
const chats = require('./chatsRouter.js')
const carts = require('./cartsRouter.js')
const users = require('./usersRouter.js')
const products = require("./product.router.js")
const session = require('./sessions.router.js')
const sessionRouter = require('./sessionrouter.js')
*/
const { uploader } = require('../utils/multer.js')


//API v2 imports
const ProductsV2 = require('./product.router.v2.js')
const UserRouterV2 = require('./users.router.v2.js');
const SessionRouterV2 = require('./session.router.v2.js')
const ViewsRouterV2 = require('./views.router.v2.js')
const CartRouterV2 = require('./carts.v2.router.js');
const ContactsRouter = require('./contacts.v2.js');

//API V2 Instances
const productsv2 = new ProductsV2()
const usersv2 = new UserRouterV2()
const sessionv2 = new SessionRouterV2()
const viewsv2 = new ViewsRouterV2()
const cartsv2 = new CartRouterV2()
const contacts = new ContactsRouter()

//API v2 endpoints
/*Agregar un middleware que genere una cookie de guest*/
router.use('/', viewsv2.getRouter())//Ruta de vistas
router.use('/api/v2/products', uploader.single('thumbnail'), productsv2.getRouter())//Funciona
router.use('/api/v2/users', usersv2.getRouter())//Funciona
router.use('/api/v2/session', sessionv2.getRouter())
router.use('/api/v2/carts', cartsv2.getRouter())//Funciona
router.use('/api/contacts', contacts.getRouter())

/* 
DEPRECATED
router.use('/api/products', products)
router.use('/views', views)
router.use('/api/realtimeproducts', realtime)
router.use('/api/chat', chats)
router.use('/api/carts', carts)
router.use('/api/users', users)
router.use('/api/session', session)

//Clase 23
const dictionary = require('./dictionary.router.js')
const pets = require('./pets.router.js')
router.use('/dictionary', dictionary)
router.use('/api/pets', pets)

//Se importa la clase que ahora manejará todas nuestras rutas y se instancia.
const { UserRouter } = require('./newUser.router.js')
const userRouter = new UserRouter()
router.use('/api/test', userRouter.getRouter())

//segunda practica integradora
router.use('/api/pruebas', sessionRouter)

//FORK
const testFork = require('../process/test.js')
router.use('/testfork', testFork) 
*/

router.use('*', (_req, res) => {
    res.status(404).send({
        status: 'Error',
        payload: 'Not Found'
    })
})

module.exports = router