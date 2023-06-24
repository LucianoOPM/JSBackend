const ProductDTO = require('../DTO/ProductsDTO')

class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }

    get = async (req) => {
        try {
            return await this.dao.getProduct(req)
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProductRepository