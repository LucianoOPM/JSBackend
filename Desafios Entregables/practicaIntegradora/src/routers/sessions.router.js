const { Router } = require('express')
const UserManager = require('../DAO/productManagerMongo/usersManagerM')
const router = Router()
const manager = new UserManager()

const passport = require('passport')
const { generateToken, authToken } = require('../config/passportJWT')
const passportCall = require('../passport-JWT/passport.call')
const authorization = require('../passport-JWT/authJWT')


/* 
router.post('/registro', async (req, res) => {
    try {
        await manager.addUser(req.body)
        res.redirect('/views/session/login')
    } catch (error) {
        if (error) {
            res.redirect('/views/session/register')
        }
    }
}) 
*/

// router.post('/login', async (req, res) => {
//     try {
//         const logUser = await manager.loginUser(req.body)
//         req.session.user = {
//             first_name: logUser.first_name,
//             last_name: logUser.last_name,
//             age: logUser.age
//         }
//         if (logUser) {
//             if (logUser.email === 'adminCoder@coder.com') {
//                 req.session.user.rol = 'admin'
//                 return res.redirect('/views/products')
//             }
//             req.session.user.rol = 'usuario'
//             return res.redirect('/views/products')
//         }
//     } catch (error) {
//         if (error) {
//             res.status(401).redirect('/views/session/login')
//         }
//     }
// })

/* 
//passport local
router.post('/registro', passport.authenticate('register', { failureRedirect: '/views/session/register', successRedirect: '/views/session/login' }), async (req, res) => {
    try {
        res.send({
            status: 'success',
            msg: 'Registro exitoso'
        })
    } catch (error) {
        if (error) return error
    }
})
router.post('/login', passport.authenticate('login', { failureRedirect: '/views/session/login' }), async (req, res) => {
    try {
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email
        }
        if (req.user.email === 'adminCoder@coder.com') {
            req.session.user.rol = 'admin'
            return res.redirect('/views/products')
        }
        req.session.user.rol = 'user'
        res.redirect('/views/products')
    } catch (error) {
        return `${error}`
    }
})
*/


//passport JWT
router.post('/registro', async (req, res) => {
    try {
        const { first_name, role, email } = await manager.addUser(req.body)
        res.status(201).send({
            status: 'success',
            user: { first_name, role, email }
        })
    } catch (error) {
        if (error) {
            res.status(409).send({
                status: 'Error',
                payload: error.message
            })
            //res.redirect('/views/session/register')
        }
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email } = req.body
        if (email === 'adminCoder@coder.com') {
            req.body.role = "admin"
            const token = generateToken(req.body)
            return res.cookie('coderCookieToken'/*Nombre de la cookie dónde se guardará el token del usuario.*/, token, {
                maxAge: 60 * 60 * 100,
                httpOnly: true
            }).send({
                status: 'success',
                message: 'Login success',
                payload: req.body
            })
        }
        const userDB = await manager.loginUser(req.body)
        //Recordar, no pasar datos sensibles como la palabra secreta o la contraseña del usuario a la hora de generar el token.
        res.cookie('coderCookieToken', userDB, {
            maxAge: 60 * 60 * 100,
            httpOnly: true//Con esta configuración evitamos que las cookies solo sean accesibles mediante peticiones http
        }).send({
            status: 'success',
            message: 'Login success'
        })
    } catch (error) {
        if (error) return res.status(401).send({
            status: 'Error',
            payload: error.message
        })
    }
})

router.get('/pruebas', authToken, async (req, res) => {
    try {
        res.send({
            payload: "autorizado"
        })
    } catch (error) {
        return error
    }
})

//passportCall es una función creada en la carpeta passport-JWT dónde pasamos la estrategia que estamos utilizando que es la encargada de manejar los errores (en caso de tener errores).
//Passportcall ya cumple con validaciones si el token viene corrupto o no viene el token del logueo.
//authorization es un middleware que valida el rol del usuario, en caso de que haya vistas dependiendo el rol del usuario.
router.get('/current', passportCall('jwt'), authorization('admin'), async (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        return error
    }
})


router.post('/logout', async (req, res) => {
    try {
        req.session.destroy()
        res.redirect('/views/session/login')
    } catch (error) {
        return `ERROR: ${error}`
    }

})

router.post('/restore', async (req, res) => {
    try {
        const changes = await manager.changePassword(req.body)
        if (!changes) return res.status(404).send({
            status: 'unsuccess',
            payload: 'No se efectuarion los cambios'
        })

        res.status(200).redirect('/views/session/login')
    } catch (error) {
        if (error) return error
    }
})

//github
router.get('/github', passportCall('github', {
    scope: ['user: email']
}))
router.get('/githubcallback', passportCall('github', {
    failureRedirect: '/views/session/login'
}), async (req, res) => {
    try {
        const { name, email, password } = req.user
        const findUser = await manager.findUser(email)

        if (!findUser) {//Si no encuentra el usuario
            const newUser = {
                first_name: name.split(' ')[0],
                last_name: name.split(' ')[1],
                email,
                password
            }//Separamos sus valores
            const { first_name, last_name, email: tokenMail, role, _id } = await manager.addUserGithub(newUser)//Y lo guardamos en la base de datos
            const token = generateToken({ first_name, last_name, email: tokenMail, role, id: _id.toString() })//Generamos un token

            return res.status(200).cookie('coderCookieToken', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 100
            }).send({ status: 'success', payload: token })//Y accede con github
        }
        //Si encuentra el usuario
        const { first_name, last_name, email: tokenMail, role, _id } = findUser//Separamos sus datos
        const token = generateToken({ first_name, last_name, email: tokenMail, role, id: _id.toString() })
        return res.status(200).cookie('coderCookieToken', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 100
        }).send({ status: 'success', payload: token })//Generamos una cookie con sus datos no vulnerables.
    } catch (error) {
        if (error) return error
    }
})

module.exports = router