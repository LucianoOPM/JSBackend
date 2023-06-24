const { connectDB } = require("../config/DBConfig");
const { PERSISTENCE } = require("../config/config");

const FACTORY = {
    MONGO: {
        connection: connectDB(),
        ContactDAO: require('./MongoDAO/contactDAO'),
        ProductDAO: require('./MongoDAO/productMMongo'),
        UserDAO: require('./MongoDAO/usersManagerM'),
        CartDAO: require('./MongoDAO/cartManagerM')
    },
    FILESYSTEM: {
        UserDAO: require('./FSDAO/userDAO'),
        ProductDAO: require('./FSDAO/proManJSON'),
        CartDAO: require('./FSDAO/cartsManager')
    },
    MEMORY: {
        ProductDAO: require('./MemoryDAO/products.DAO'),
        UserDAO: require('./MemoryDAO/users.dao'),
        CartDAO: require('./MemoryDAO/carts.dao')
    }
}

module.exports = FACTORY[PERSISTENCE]