const cartManagerM = require("../DAO/productManagerMongo/cartManagerM");
const productMMongo = require("../DAO/productManagerMongo/productMMongo");
const UserManager = require("../DAO/productManagerMongo/usersManagerM");

const productService = new productMMongo()
const cartService = new cartManagerM()
const userService = new UserManager()

module.exports = {
    productService,
    userService,
    cartService
}

//Traer instancias del DAO acá
//Proximamente repository