const { ProductManager } = require('../productsManager/proManJSON')
const path = './src/productsManager/data.json'

const manager = new ProductManager(path)


const webSocket = (io) => {
    io.on('connection', async socket => {
        const products = await manager.getProducts()
        socket.emit('server:products', products)

        socket.on('client:addProduct', async (data) => {
            await manager.addProduct(data)
        })
        socket.on('client:deleteProduct', async (data) => {
            await manager.deleteProduct(data)
        })
    })
}

module.exports = {
    webSocket
}