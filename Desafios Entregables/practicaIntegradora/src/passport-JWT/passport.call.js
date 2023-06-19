const passport = require('passport')

const passportCall = (strategy) => {//Se ejecuta la función con una estrategia
    return async (req, res, next) => {//Retorna la ejecución de una función
        passport.authenticate(strategy, (err, user, info) => {
            //Realiza un authenticate que pasa a validar el archivo passport.config.js dependiendo de la estrategia
            if (err) return next(err) //Si recibe un error, retorna directamente el error
            const { user: currentUser } = user //Si no, recibimos los datos del usuario por medio de su token

            //Si no hay un usuario, retorna un error
            //Si no hay un token de autorización, info retorna el error
            if (!currentUser) return res.status(401).send({ status: 'error', error: info.message ? info.message : info.toString() })

            //Si hay un usuario, lo guarda en el req.user
            req.user = currentUser
            next()
        })(req, res, next)
    }
}

module.exports = passportCall