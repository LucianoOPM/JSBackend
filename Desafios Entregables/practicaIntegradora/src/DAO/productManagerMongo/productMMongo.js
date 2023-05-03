const { productModel } = require("../models/productModel.js");

class ProductManagerMongo {
    getProduct = async () => {
        try {
            return await productModel.find().lean()
        } catch (error) {
            return `ERROR: ${error}`
        }
    }
    updateProduct = async (pid, changes) => {
        try {
            if (!pid) {
                return `No se efectuaron los cambios porque no se entregó un ID`
            }
            if (!changes) {
                return `No se efectuaron los cambios porque no hay cambios`
            }
            return await productModel.updateOne({ _id: pid }, changes)
        } catch (error) {
            return `ERROR: ${error}`
        }
    }
    createProduct = async (product) => {
        try {
            if (!product) {
                return `No hay un producto para agregar.`
            }
            return await productModel.create(product)
        } catch (error) {
            return `ERROR: ${error}`
        }
    }
    deleteProduct = async (pid) => {
        try {
            if (!pid) {
                return `No hay ID para eliminar el producto.`
            }
            return await productModel.deleteOne({ _id: pid })
        } catch (error) {
            return `ERROR: ${error}`
        }
    }
}

module.exports = new ProductManagerMongo()