const { isValidObjectId } = require("mongoose");
const { generateToken } = require("../config/passportJWT");
const { userService, cartService } = require("../services");//instancia del manager de mongo
const { createHash } = require("../utils/bcrypthash");
const querySearch = require("../utils/querySearch");

class UserController {
    get = async (req, res) => {
        try {
            //recuperamos las keys del objeto req.query
            const queryKeys = Object.keys(req.query)

            //Si el req.query viene vacio, ejecuta una consulta general
            if (queryKeys.length === 0) {
                const emptyQuery = querySearch(req.query, "users")
                const docs = await userService.getUsers(emptyQuery)
                return res.status(200).sendSuccess(docs)
            }

            //Si el req.query no viene vacio, busca que venga con las palabras permitidas
            const SEARCH_KEYS = ["role", "limit", "sort", "page"]
            const successQuery = queryKeys.some(keys => SEARCH_KEYS.includes(keys))
            if (!successQuery) return res.status(400).sendServerError('Some keys missmatch with accepted search keys')

            //Si contiene las palabras permitidas, ejecuta la función para formar la query
            const searchQuery = querySearch(req.query, "users")

            //Ejecuta la query
            const searchUser = await userService.getUsers(searchQuery)

            //Arroja el resultado a la paginación
            res.status(200).sendSuccess(searchUser)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    getById = async (req, res) => {
        try {
            //Extrae el UID de los parametros de request
            const { UID } = req.params

            //Valida que el UID sea un ObjectID valido
            if (!isValidObjectId(UID)) return res.status(400).sendServerError('UID is not an accepted ObjectID')

            //Efectua la busqueda por UID
            const user = await userService.findUser(UID)


            if (!user) return res.status(404).sendUserError("User not found")

            //Arroja el resultado
            res.status(200).sendSuccess(user.nonSensitiveUser)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    post = async (req, res) => {
        try {
            //Extrae los valores del req.body
            const { first_name, last_name, email, password, birthdate } = req.body

            //Si faltan algunos de estos valores, retorna un error
            if (!first_name || !last_name || !email || !password || !birthdate) return res.status(401).sendServerError('Empty Values')

            const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegExp.test(email)) return res.status(500).sendServerError('email is not a valid value')
            //Si no faltan valores, efectua una busqueda por email para validar que el usuario no este registrado en la base de datos.
            const userExists = await userService.findUser(email)

            //Si está, ejecuta un error
            if (userExists) return res.status(401).sendServerError('User Already Exists')

            //Si no está, genera un carrito nuevo y se le asigna al usuario.
            const { _id } = await cartService.newCart()

            //Guarda el usuario en la base de datos
            const registeredUser = await userService.addUser({
                first_name,
                last_name,
                email,
                cartID: _id,
                birthdate,
                password: createHash(password),
                role: email == "adminCoder@coder.com" ? "ADMIN" : "user" //Validacion de que si el usuario registrado es "admin coder" se le asigna el rol de admin
            })

            //Genera un token
            const token = generateToken({ user: { userID: registeredUser.userID, role: registeredUser.role, cartID: registeredUser.cartID, email: registeredUser.email } })

            //Entrega el token a la cookie "coderCookieToken" y le asigna la configuración
            res.status(200).sendSuccess({ message: 'User registered Successfully', token })
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    put = async (req, res) => {
        try {
            //Valores que se permitirán cambiar al usuario
            const acceptedBody = ["first_name", "last_name", "email", "role", "birthdate"]

            //Extrae el UID y el body del req
            const { params: { UID }, body } = req
            //extrae las key del req.body
            const bodyKeys = Object.keys(req.body)
            //Valida que las keys del req.body esten dentró de los keys permitidos
            const validBody = bodyKeys.some(keys => !acceptedBody.includes(keys))

            //validaciones
            if (!isValidObjectId(UID)) return res.status(400).sendServerError("UID isn't a valid ObjectID")//Valida que el UID sea un objectID valido
            if (bodyKeys.length === 0) return res.status(400).sendServerError('Empty request body keys')//Valida que no tenga un json vacio para las modificaciones
            if (validBody) return res.status(400).sendServerError("Some keys doesn't match with allowed key user values")//Valida que las modificaciones implementadas sean validas.

            //Efectua los cambio y se extraen las propiedades que se utilizarán para generar el token (No extraer la constraseña o información sensible)
            const { cartID, role, email, userID } = await userService.updateUser(UID, body)

            //Genera el token

            const token = generateToken({ user: { cartID, role, email, userID } })

            //Guarda el nuevo token generado en las cookies
            res.status(200).cookie('coderCookieToken', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 100
            }).sendSuccess('User updated')
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    delete = async (req, res) => {
        try {
            //extrae el UID de los params
            const { params: { UID } } = req

            //Valida que el UID sea un objectID válido
            if (!isValidObjectId(UID)) return res.status(400).sendServerError('UID is not a valid ObjectId')
            const { nonSensitiveUser: { cartID } } = await userService.findUser(UID)


            if (!user) return res.status(400).sendServerError('User has not found')

            //Elimina al usuario según el UID otorgado
            await cartService.deleteCart(cartID)
            await userService.deleteUser(UID)

            res.status(200).sendSuccess('User deleted successfully')
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    restore = async (req, res) => {
        try {
            const { body: { email, password } } = req

            const { nonSensitiveUser: { userID } } = await userService.findUser(email)

            if (!userID) return res.status(400).sendUserError("Error.")

            const newPassword = createHash(password)

            await userService.changePassword({ email, newPassword })

            res.status(200).sendSuccess('password changed successfully')
        } catch (error) {
            res.status(500).sendServerError(error.messsage)
        }
    }
}

module.exports = UserController;