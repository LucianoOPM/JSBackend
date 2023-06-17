const ProductController = require("../controllers/productsv2.controller");
const { RouterClass } = require("./RouterClass");

const product = new ProductController()

//ROUTER CLASS SE ENCARGA UNICAMENTE DE VALIDAR LAS RUTAS y los middleware, para validar las peticiones y respuestas es el controller.
class ProductRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], product.get)//Funciona
        this.get('/:pid', ['PUBLIC'], product.getById)//Funciona
        this.post('/', ['PUBLIC'], product.post)//Funciona
        this.put('/:pid', ['PUBLIC'], product.update)//Funciona
        this.delete('/:pid', ['PUBLIC'], product.delete)//Funciona
    }
}

module.exports = ProductRouter