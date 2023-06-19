const { productModel } = require("../models/productModel.js");

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
            return productModel.findById(params).lean()
        } catch (error) {
            return error
        }
    }

    updateProduct = async (reqPid, changes) => {/*cambiar*/
        try {
            const { pid } = reqPid
            const update = await productModel.findByIdAndUpdate(pid, { $set: changes })
            return update
        } catch (error) {
            if (error) throw error
        }
    }

    createProduct = async (product) => {/*cambiar*/
        try {
            const productAlreadyExists = await productModel.findOne({ code: product.code })
            if (productAlreadyExists) {
                throw new Error('Product already exists')
            }

            return await productModel.create(product)
        } catch (error) {
            if (error) throw error
        }
    }

    deleteProduct = async (productID) => {/*cambiar*/
        try {
            const pExists = await productModel.findById(productID)
            if (!pExists) throw new Error("Products missmatches ID or doesn't exists")

            return await productModel.deleteOne({ _id: productID })
        } catch (error) {
            if (error) throw error
        }
    }
}

module.exports = ProductManagerMongo