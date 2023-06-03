const { generateToken } = require("../../config/passportJWT");
const { createHash, isValidPass } = require("../../utils/bcrypthash");
const { userModel } = require("../models/usersModel");

class UserManager {
    addUser = async (data) => {
        try {
            const { first_name, last_name, email, age, password } = data
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }
            if (email === "adminCoder@coder.com") {
                newUser.role = 'ADMIN'
            }
            const findUser = await userModel.findOne({ email })

            if (findUser) {
                throw new Error('El usuario ya existe.')
            }

            return await userModel.create(newUser)
        } catch (error) {
            if (error) {
                throw error
            }
        }
    }

    addUserGithub = async (data) => {
        try {
            const { name, email } = data

            const findUser = await userModel.findOne({ email })
            const newUser = {
                first_name: name.split(' ')[0],
                last_name: name.split(' ')[1],
                email,
                password: ""
            }
            if (findUser) {
                return newUser
            }
            await userModel.create(newUser)
            return newUser
        } catch (error) {
            if (error) throw error
        }
    }

    loginUser = async (data) => {
        try {
            const { email, password } = data

            //jwt
            /*
            const { password: pass, ...userData } = await userModel.findOne({ email })//Buscamos el user
            const { password: pass2, ...datos } = userData._doc //sacamos los datos sensibles del usuario, como la contraseña y otras cosas
            const access_token = generateToken(datos)//generamos el token del usuario con sus datos, sin incluid los datos sensibles como contraseñas y demás 
            */

            //passportLocal 
            const findUser = await userModel.findOne({ email })
            if (!findUser) throw new Error('No se encuentra el usuario')
            if (!isValidPass(password, findUser)) {
                throw new Error('El usuario o la contraseña con incorrectas')
            }
            /*
            formulario
            if (!findUser) {
                throw new Error('El correo no se encuentra en la base de datos')
            }
            if (findUser.password !== password) {
                throw new Error('La contraseña es incorrecta')
            }
            */

            return findUser
            //Retornamos el token
            /*             
            if (!limit) {
            return await userModel.find({}).limit(10).skip(page * 10).sort({ [query]: sort })
            } 
            */
        } catch (error) {
            throw error.message
        }
    }

    changePassword = async (userReq) => {
        try {
            const { email, password } = userReq
            const newPass = createHash(password)
            const test = await userModel.findOneAndUpdate({ email }, { $set: { password: newPass } })
            return test
        } catch (error) {
            return `ERROR: ${error}`
        }
    }
    findUser = async (id) => {
        try {
            return await userModel.findOne({ email: id })
            //return await userModel.findById(id)
        } catch (error) {
            return `ERROR: ${error}`
        }
    }
}

module.exports = {
    UserManager
}