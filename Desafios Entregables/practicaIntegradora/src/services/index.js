const {
    ContactDAO,
    UserDAO,
    CartDAO,
    ProductDAO
} = require("../DAO/factory.js");

const ContactRepository = require("../repositories/contact.repository.js");
const UserRepository = require("../repositories/user.repository.js");
const ProductRepository = require('../repositories/product.repository.js')
const CartRepository = require('../repositories/cart.repository.js')

const contactService = new ContactRepository(new ContactDAO())
const userService = new UserRepository(new UserDAO())
const productService = new ProductRepository(new ProductDAO())
const cartService = new CartRepository(new CartDAO())

module.exports = {
    productService,
    userService,
    cartService,
    contactService
}

/*
Al momento de yo cambiar la persistencia o la base de datos de mi proyecto, este archivo es el que se encarga de interconectar los controlladores con las nomenclaturas de la base de datos homogenizada
*/