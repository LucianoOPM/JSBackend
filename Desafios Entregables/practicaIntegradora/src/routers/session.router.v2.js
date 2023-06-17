const SessionController = require("../controllers/session.controller");
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
    }
}

module.exports = SessionRouter
//login
//logout
//github