const CartController = require("../controllers/cartsv2.controller");
const { RouterClass } = require("./RouterClass");

const cart = new CartController()

class CartRouter extends RouterClass {
    init() {
        this.get('/:CID', ['PUBLIC'], cart.get)//Funciona
        this.put('/:CID', ['PUBLIC'], cart.addProducts)//Funciona
        this.put('/:CID/product/:PID', ['PUBLIC'], cart.updateProduct)//Funciona
        this.delete('/:CID', ['PUBLIC'], cart.delete)//Funciona
        this.delete('/:CID/product/:PID', ['PUBLIC'], cart.deleteProduct)//Funciona
    }
}

module.exports = CartRouter