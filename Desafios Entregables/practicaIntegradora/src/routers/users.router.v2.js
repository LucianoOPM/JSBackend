const UserController = require("../controllers/userv2.controller");
const { RouterClass } = require("./RouterClass");

const user = new UserController()

class UsersRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], user.get)//Funciona
        this.get('/:UID', ['PUBLIC'], user.getById)//Funciona
        this.post('/', ['PUBLIC'], user.post)//Funciona
        this.put('/:UID', ['PUBLIC'], user.put)//Funciona
        this.delete('/:UID', ['PUBLIC'], user.delete)//Funciona//Cuando elimines al usuario, elimina su carrito
    }
}
module.exports = UsersRouter