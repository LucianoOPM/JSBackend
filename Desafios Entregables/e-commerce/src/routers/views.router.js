const ViewsController = require("../controllers/viewsv2.controller");
const { isLogged } = require("../middleware/auth");
const RouterClass = require("./RouterClass");

const views = new ViewsController()

class ViewsRouter extends RouterClass {
    /*QUIEN PUEDE ACCEDER A LAS VISTAS*/
    init() {
        /*Views de products*/
        this.get('/products', ['PUBLIC'], views.products)//Funciona
        this.get('/products/:PID', ['PUBLIC'], views.productsById)//Funciona
        /*Views session*/
        /*Login*/
        this.get('/login', ['PUBLIC'], views.login)//Funciona//Para todos los usuarios, pero si ya está logueado, redirigir a productos
        // this.get('/logout', ['PUBLIC'], views.logout)
        this.get('/register', ['PUBLIC'], isLogged, views.register)//Funciona//Para todos los usuarios, pero si ya está logueado redirigir a productos
        this.get('/restore', ['PUBLIC'], views.restore)//Funciona
        /*Realtimeproducts*/
        this.get('/realtimeproducts', ['ADMIN'], views.realtimeproducts)//Funciona//Sólo para personal autorizado(admins)
        /*chat*/
        this.get('/chat', ['USER', 'ADMIN'], views.chat)//Implementado, pero no funciona
        this.get('/cart/:cid', ['PUBLIC'], views.userCart)
    }
}

module.exports = ViewsRouter

//Si viene el authorization o cookie es porque ya está logueado > login no acceso > register no acceso
//Todos pueden acceder a products