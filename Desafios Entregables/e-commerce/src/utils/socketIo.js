const { productService } = require('../services/index.js')
const querySearch = require('./querySearch.js')

const webSocket = (io) => {
    io.on('connection', async socket => {
        try {
            const query = querySearch({ limit: 30, sort: -1 }, "products")
            let products = await productService.get(query)
            io.emit('server:renderProducts', products)

            socket.on('client:newProducts', async _ => {
                products = await productService.get(query)
                io.emit('server:renderProducts', products)
            })

            socket.on('client:deleteProduct', async _ => {
                products = await productService.get(query)
                socket.emit('server:renderProducts', products)
            })
        } catch (error) {
            return error.message
        }
    })
}

module.exports = webSocket