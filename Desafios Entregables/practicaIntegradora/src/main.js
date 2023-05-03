//Importaciones
const express = require('express')
const hbs = require('express-handlebars')
const main = require('./routers/routes.js')
const { Server } = require('socket.io')
const { webSocket } = require('./utils/socketIo.js')
const { connectDB } = require('./config/DBConfig.js')

//instanciaciones
const app = express()
connectDB()

//Configuraciones
app.engine('handlebars', hbs.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(`${__dirname}/public`))

//routers
app.use(main)

//launcher del server
const httpServer = app.listen(8080, () => {
    console.log("Se inició el servidor.")
})

//utilización de sockets
const io = new Server(httpServer)
webSocket(io)