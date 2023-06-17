const ViewsController = require("../controllers/viewsv2.controller");
const { RouterClass } = require("./RouterClass");

const views = new ViewsController()

class ViewsRouter extends RouterClass {

    init() {
        /*Views de products*/
        this.get('/products', ['PUBLIC'], views.products)//Funciona
        this.get('/products/:PID', ['PUBLIC'], views.productsById)//Funciona
        /*Views session*/
        /*Login*/
        this.get('/login', ['PUBLIC'], /*middleware isLoggued*/views.login)//Funciona//Para todos los usuarios, pero si ya está logueado, redirigir a productos
        this.get('/register', ['PUBLIC'], /*middleware isLoggued*/views.register)//Funciona//Para todos los usuarios, pero si ya está logueado redirigir a productos
        this.get('/restore', ['PUBLIC'], views.restore)//Funciona
        /*Realtimeproducts*/
        this.get('/realtimeproducts', ['PUBLIC'], views.realtimeproducts)//Funciona//Sólo para personal autorizado(admins)
        /*chat*/
        this.get('/chat', ['PUBLIC'], views.chat)//Implementado, pero no funciona.//Para usuarios logueados
        this.get('/cart/:cid', ['PUBLIC'], views.userCart)//Para usuarios logueados
    }
}

module.exports = ViewsRouter