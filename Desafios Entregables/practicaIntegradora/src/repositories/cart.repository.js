const CartDTO = require('../DTO/CartsDTO')

class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    newCart = async () => {
        try {
            return this.dao.newCart()
        } catch (error) {
            throw error
        }
    }

    deleteCart = async (cid) => {
        try {
            return await this.dao.deleteCart(cid)
        } catch (error) {
            throw error
        }
    }
}

module.exports = CartRepository