const MongoSingleton = require('../utils/singleton')
//mongoURL tendría el cluster de mongo
//const ecommerce = 'mongodb://127.0.0.1:27017/ecommerce'

module.exports = {
    /* connectDB: () => {
        connect(process.env.MONGO_URL)
        //connect(ecommerce)
        console.log('Conexion a la base de datos')
    } */
    connectDB: async () => await MongoSingleton.getInstance()
}