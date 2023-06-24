const UserController = require("../controllers/userv2.controller");
const { RouterClass } = require("./RouterClass");

const user = new UserController()

class UsersRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], user.get)//Funciona
        this.get('/:UID', ['PUBLIC'], user.getById)//Funciona
        this.post('/', ['PUBLIC'], user.post)//Funciona
        this.put('/:UID', ['PUBLIC'], user.put)//Funciona
        this.post('/restore', ['PUBLIC'], user.restore)
        this.delete('/:UID', ['PUBLIC'], user.delete)//Funciona
    }
}
module.exports = UsersRouter