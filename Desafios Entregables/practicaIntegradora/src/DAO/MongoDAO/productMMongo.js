const { productModel } = require("../MongoDAO/models/productModel.js");

class ProductManagerMongo {
    getProduct = async (request) => {
        try {
            return await productModel.paginate(request[0], request[1])
        } catch (error) {
            if (error) throw error
        }
    }

    getProductById = async (params) => {
        try {
            return await productModel.findById(params).lean()
        } catch (error) {
            return error
        }
    }

    getProductByCode = async (code) => {
        try {
            return await productModel.findOne({ code: code })
        } catch (error) {
            throw error
        }
    }

    updateProduct = async (pid, changes) => {
        try {
            return await productModel.findByIdAndUpdate(pid, { $set: changes })
        } catch (error) {
            if (error) throw error
        }
    }

    createProduct = async (product) => {
        try {
            return await productModel.create(product)
        } catch (error) {
            if (error) throw error
        }
    }

    deleteProduct = async (productID) => {
        try {
            return await productModel.deleteOne({ _id: productID })
        } catch (error) {
            if (error) throw error
        }
    }
}

module.exports = ProductManagerMongo