const ProductController = require("../controllers/productsv2.controller");
const uploader = require('../middleware/multer');
const RouterClass = require("./RouterClass");

const product = new ProductController()

//ROUTER CLASS SE ENCARGA UNICAMENTE DE VALIDAR LAS RUTAS y los middleware, para validar las peticiones y respuestas es el controller.
class ProductRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], product.get)//Funciona
        this.get('/:pid', ['PUBLIC'], product.getById)//Funciona
        this.post('/', ['ADMIN'], uploader.single('thumbnail'), product.post)//Funciona ADMIN
        this.put('/:pid', ['ADMIN'], product.update)//Funciona ADMIN
        this.delete('/:pid', ['ADMIN'], product.delete)//Funciona ADMIN
    }
}

module.exports = ProductRouter