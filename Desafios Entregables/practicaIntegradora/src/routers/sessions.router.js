const { Router } = require('express')
const { UserManager } = require('../DAO/productManagerMongo/usersManagerM')
const passport = require('passport')
const { generateToken, authToken } = require('../config/passportJWT')
const router = Router()
const manager = new UserManager()

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

/*
//passport JWT
router.post('/login', async (req, res) => {
    try {
        //const userDB = await manager.loginUser(req.body)
        const userDB = generateToken({
            "first_name": "Ana Paula",
            "last_name": "Montiel Bustos",
            "edad": 24
        })
        //Recordar, no pasar datos sensibles como la palabra secreta o la contraseña del usuario a la hora de generar el token.
        res.send({
            status: 'success',
            payload: userDB
        })
    } catch (error) {
        if (error) {
            res.status(401).redirect('/views/session/login')
        }
    }
})
router.post('/registro', async (req, res) => {
    try {
        const newUser = generateToken({
            'first_name': 'Luciano',
            'last_name': 'Perez',
            'edad': 23
        })
        res.send({
            status: 'success',
            payload: newUser
        })
    } catch (error) {
        if (error) {
            res.redirect('/views/session/register')
        }
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
*/


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
router.get('/github', passport.authenticate('github', {
    scope: ['user: email']
}))
router.get('/githubcallback', passport.authenticate('github', {
    failureRedirect: '/views/session/login'
}), async (req, res) => {
    try {
        req.session.user = req.user
        res.redirect('/views/products')
    } catch (error) {
        if (error) return error
    }
})

module.exports = router