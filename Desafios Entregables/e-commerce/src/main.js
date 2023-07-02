//Importaciones
const express = require('express')
const hbs = require('express-handlebars')
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')
const main = require('./routers/routes.js')
const webSocket = require('./utils/socketIo.js')
const chatSocket = require('./utils/chatSocket.js')
const passport = require('passport')
const initPassport = require('./config/passport.config.js')
const cors = require('cors')

//Ejecucion de funciones.
const app = express()
initPassport()

//Configuraciones
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', hbs.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')
app.use('/static', express.static(`${__dirname}/public`))
app.use(cookieParser("S1gn3d Co0k13"))
passport.use(passport.initialize())

//routers
app.use(main)
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.message)
})

const httpServer = app.listen(process.env.PORT, (err) => {
    if (err)`ERROR en el servidor ${err}`
    console.log(`Server listen on ${process.env.PORT}`)
})

//utilización de sockets
const io = new Server(httpServer)
webSocket(io)
chatSocket(io)