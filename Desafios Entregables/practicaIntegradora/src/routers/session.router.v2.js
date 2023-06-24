const { authToken } = require("../config/passportJWT");
const SessionController = require("../controllers/session.controller");
const authorization = require("../passport-JWT/authJWT");
const passportCall = require("../passport-JWT/passport.call");
const { RouterClass } = require("./RouterClass");

const session = new SessionController()

class SessionRouter extends RouterClass {
    init() {
        this.post('/login', ['PUBLIC'], session.login)
        this.post('/logout', ['PUBLIC'], passportCall('jwt'), session.logout)
        this.get('/github', ['PUBLIC'], passportCall('github', { scope: ['user: email'] }))
        this.get('/githubcallback', ['PUBLIC'], passportCall('github', {
            failureRedirect: '/login'
        }), session.github)
        this.get('/current', ['PUBLIC'], /*cuando vienen de headers --> authToken y cuando vienen de cookies--> passportCall('jwt'),*/ authorization('ADMIN'), session.currentSession)
    }
}

module.exports = SessionRouter
//login
//logout
//github