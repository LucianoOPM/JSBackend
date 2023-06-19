const passport = require('passport')
const jwt = require('passport-jwt')
const gitStrategy = require('passport-github2')
const {
    SECRET_KEY,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL
} = require('../config/config')

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt


const cookieExtractor = req => {//Extraer las cookies al momento de acceder a las vistas
    let token = null//Si no hay cookies, retorna un null
    if (req && req.cookies) {
        //Si hay cookies, retorna la cookie
        token = req.cookies['coderCookieToken']
    }
    return token
}
const initPassport = () => {
    //Cómo passport no controla las cookies por el mismo, vamos a realizar una función que nos ayudará en este proceso.
    //Ya que el modulo session a través de es quien controlaba las cookies hay que recordar que si vamos a usar JWT no usaremos session.
    //estrategia JWT
    passport.use('jwt', new JWTStrategy({
        //Obtiene el codigo jwt de la peticion y ejecuta el método de extraccion de la funcion cookieExtractors
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        //Decodea al usuario extraido de la cookie según la palabra con la que se haya codeado, en este caso la palabra es "PalabraJWTSecreta"
        secretOrKey: SECRET_KEY//Esta palabra debe estar privada desde el .env
    }, async (jwt_payload, done) => {
        try {
            console.log(jwt_payload);
            //Si todo lo anterior resulta bien, ejecuta la callback pasando el usuario ya decodificado de vuelta a "passport.call.js"
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))

    passport.use('github', new gitStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const { name, email } = profile._json
            const userGitHub = {
                user: {
                    name, email, password: ""
                }
            }
            return done(null, userGitHub)
        } catch (error) {
            if (error) return done(error)
        }
    }))
}


module.exports = {
    initPassport
}