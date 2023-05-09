const { connect } = require('mongoose')

//const test = "mongodb://127.0.0.1:27017/test"
const test = "mongodb://127.0.0.1:27017/ecommerce"

module.exports = {
    connectDB: () => {
        connect(test)
        console.log('Conexion a la base de datos')
    }
}