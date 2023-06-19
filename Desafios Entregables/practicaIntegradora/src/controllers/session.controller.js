const { generateToken } = require("../config/passportJWT")
const { userService, cartService } = require("../services")
const ageCalculator = require("../utils/ageCalculator")
const { isValidPass } = require("../utils/bcrypthash")

class SessionController {
    login = async (req, res) => {
        try {
            const bodyKeys = Object.keys(req.body)

            if (bodyKeys.length === 0) return res.status(400).sendServerError('Empty values')

            const checkEmail = await userService.findUser(req.body.email)

            if (!checkEmail) return res.status(400).sendServerError('User is not registered')

            const test = isValidPass(req.body.password, checkEmail)

            if (!test) return res.status(400).sendServerError('User or password are wrong')

            const user = {
                ID: checkEmail._id.toString(),
                first_name: checkEmail.first_name,
                last_name: checkEmail.last_name,
                role: checkEmail.role,
                age: ageCalculator(checkEmail.birthdate),
                email: checkEmail.email,
                cartID: checkEmail.cartID.toString()
            }

            const token = generateToken(user)

            res.status(200)
                .cookie('coderCookieToken', token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000
                })
                .clearCookie("register")
                .cookie('logged', true, { maxAge: 60 * 60 * 1000, httpOnly: true })
                .sendSuccess(`User logged success ${token}`)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    logout = async (req, res) => {
        try {
            res
                .clearCookie('coderCookieToken')
                .clearCookie("logged")
                .redirect('/login')
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    github = async (req, res) => {
        try {
            const { name, email, password } = req.user
            const findUser = await userService.findUser(email)

            if (!findUser) {//Si no encuentra el usuario
                const { _id: cartID } = await cartService.newCart()

                const newUser = {
                    first_name: name.split(' ')[0],
                    last_name: name.split(' ')[1],
                    email,
                    password,
                    cartID: cartID.toString()
                }//Separamos sus valores
                const { first_name, last_name, email: tokenMail, role, _id, cartID: idCart } = await userService.addUser(newUser)//Y lo guardamos en la base de datos
                const token = generateToken({ first_name, last_name, email: tokenMail, role, id: _id.toString(), cartID: idCart })//Generamos un token

                return res.status(200).cookie('coderCookieToken', token, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000
                }).sendSuccess(`user created ${token}`)//Y accede con github
            }
            //Si encuentra el usuario
            const { first_name, last_name, email: tokenMail, role, _id, cartID } = findUser//Separamos sus datos
            const token = generateToken({ first_name, last_name, email: tokenMail, role, id: _id.toString(), cartID })
            return res.status(200).cookie('coderCookieToken', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000
            })
                .cookie('logged', true, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 1000
                })
                .redirect('/products')//Generamos una cookie con sus datos no vulnerables.
        } catch (error) {
            if (error) return error
        }
    }
}

module.exports = SessionController
