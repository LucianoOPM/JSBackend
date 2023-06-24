//Importaciones
const express = require('express')
const hbs = require('express-handlebars')
const { Server } = require('socket.io')
//const { create } = require('connect-mongo')
const cookieParser = require('cookie-parser')
//const session = require('express-session')
const main = require('./routers/routes.js')
const { webSocket, chatSocket } = require('./utils/socketIo.js')
//const { connectDB } = require('./config/DBConfig.js')
//const { initPassportMidd, /* initPassGitHub */ } = require('./config/passportConfig.js')
const passport = require('passport')
const { initPassport } = require('./passport-JWT/passport.config.js')
const cors = require('cors')

//instanciaciones
const app = express()
initPassport()
//connectDB()
//initPassportMidd()
/* initPassGitHub() */

//Configuraciones
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', hbs.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')
app.use('/static', express.static(`${__dirname}/public`))
//SI SE USA JWT, NO USAR SESSION
app.use(cookieParser("S1gn3d Co0k13"))
passport.use(passport.initialize())

//trabajando con JWT session no se utiliza
/* 
app.use(session({//No usar con JWT
    store: create({
        mongoUrl: 'mongodb://127.0.0.1:27017/ecommerce',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }),
    secret: 'Mensaje secreto 2',
    resave: false,
    saveUninitialized: false
})) 
*/
//passport.use(passport.session())//No usar con JWT
//routers
app.use(main)
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.message)
})

//launcher del server
/* const PORT = process.env.PORT */
//const PORT = 8080
const httpServer = app.listen(process.env.PORT, (err) => {
    if (err)`ERROR en el servidor ${err}`
    console.log("Se inició el servidor " + process.env.PORT)
})

//utilización de sockets
const io = new Server(httpServer)
webSocket(io)
//chatSocket(io)