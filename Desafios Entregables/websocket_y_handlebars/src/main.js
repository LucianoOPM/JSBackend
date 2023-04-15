//Importaciones
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const views = require('./routers/homeView.router.js')
const { Server } = require('socket.io')
const { webSocket } = require('./utils/socketIo.js')


//Configuraciones
app.engine('handlebars', hbs.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(`${__dirname}/public`))


//launcher del server
const httpServer = app.listen(8080, () => {
    console.log("Se inició el servidor.")
})

//utilización de sockets
const io = new Server(httpServer)
webSocket(io)


//routers
app.use('/', views)