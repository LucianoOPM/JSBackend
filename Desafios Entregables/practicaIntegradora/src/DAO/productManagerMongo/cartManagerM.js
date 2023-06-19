const { cartModel } = require('../models/cartModel.js')

class CartManagerM {
    newCart = async (cart) => {
        try {
            return await cartModel.create(cart)
        } catch (error) {
            return `ERROR: ${error}`
        }
    }

    findCart = async (cid) => {
        try {
            return await cartModel.findOne({ _id: cid })
        } catch (error) {
            throw error
        }
    }

    getCarts = async (params) => {
        try {
            return await cartModel.paginate({ _id: params }, {
                lean: true,
                populate: 'products.product'
            })
        } catch (error) {
            throw error
        }
        //Retorna los carritos según la query que se requiera, ya sea limit, cid y si no es ninguna de las dos, por defecto trae todos los carritos
    }

    updateProduct = async ({ CID, product, quantity }) => {
        try {
            return await cartModel.updateOne({ _id: CID, 'products.product': product }, { $inc: { "products.$.qty": quantity } })
        } catch (error) {
            throw error.message
        }
    }

    pushProduct = async ({ CID, product, quantity }) => {
        try {
            return await cartModel.findOneAndUpdate({ _id: CID }, { $push: { products: { product, qty: quantity } } })
        } catch (error) {
            throw error
        }
    }

    clearCart = async (cid) => {
        try {
            //Actualizar el carrito con el operador $pull el cual remueve de un array las instancias encontradas según la condicion especificada
            //https://www.mongodb.com/docs/v5.2/reference/operator/update/pull/
            return await cartModel.updateOne({ _id: cid }, { $pull: { products: {} } })
        } catch (error) {
            throw error.message
        }
    }

    delProduct = async ({ CID, PID }) => {
        try {
            return await cartModel.updateOne({ _id: CID }, { $pull: { products: { product: PID } } })
        } catch (error) {
            throw error.message
        }
    }

    deleteCart = async (CID) => {
        try {
            return await cartModel.deleteOne({ _id: CID })
        } catch (error) {
            throw error
        }
    }
}

module.exports = CartManagerM