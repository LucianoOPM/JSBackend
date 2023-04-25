import express from 'express';
import { Server } from 'socket.io';
import { connectDB } from '../src/config/objectConfig.js';
import router from '../src/routers/users.router.js'

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const httpServer = app.listen(8080, () => {
    console.log('Corriendo el servidor en el puerto 8080')
})

app.use('/', router)

connectDB()

const io = new Server(httpServer)