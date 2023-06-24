const chatMongo = require('../DAO/MongoDAO/chatManagerM.js')
const { productService } = require('../services/index.js')
const querySearch = require('./querySearch.js')

const webSocket = (io) => {
    io.on('connection', async socket => {
        try {
            const query = querySearch({ limit: 30, sort: -1 }, "products")
            let products = await productService.getProduct(query)
            io.emit('server:renderProducts', products)

            socket.on('client:newProducts', async _ => {
                products = await productService.getProduct(query)
                io.emit('server:renderProducts', products)
            })

            socket.on('client:deleteProduct', async _ => {
                products = await productService.getProduct(query)
                socket.emit('server:renderProducts', products)
            })
        } catch (error) {
            return error.message
        }
    })
}

const chatSocket = io => {
    io.on('connection', async socket => {
        //Socket del chat

        socket.on('client:createUser', async (data) => {
            await chatMongo.newChat({ user: data })
        })

        socket.on('client:newMesage', async (data) => {
            await chatMongo.addMessage(data)

            const mensajes = []
            const fetchMessage = await chatMongo.readLastMessage(data.userName)
            mensajes.push(fetchMessage)

            io.emit('server:chatHistory', mensajes)
        })
    })
}

module.exports = {
    webSocket,
    chatSocket
}