const { cartModel } = require('../models/cartModel.js')

class CartManagerM {
    newCart = async (data) => {
        try {
            return await cartModel.create(data)
        } catch (error) {
            return `ERROR: ${error}`
        }
        //Crea un carrito nuevo con un array de productos vacios (de momento sin un usuario vinculado)
    }

    getCarts = async (query) => {
        try {
            const Q_VALUES = {
                'limit': await cartModel.find({}).limit(query.limit),
                'cid': await cartModel.find({ _id: query.cid })
            }
            return Q_VALUES[Object.keys(query)] || await cartModel.find({})
        } catch (error) {
            return `ERROR: ${error}`
        }
        //Retorna los carritos según la query que se requiera, ya sea limit, cid y si no es ninguna de las dos, por defecto trae todos los carritos
    }

    addProductInCart = async (info) => {
        try {
            const { cid, pid } = info;

            const cart = await cartModel.findOne({ _id: cid });

            const productIndex = cart.products.findIndex(product => product.idProduct === pid);

            if (productIndex === -1) {
                return await cartModel.updateOne({ _id: cid }, { $push: { products: { idProduct: pid, qty: 1 } } });
            }

            return await cartModel.updateOne({ _id: cid, "products.idProduct": pid }, { $inc: { "products.$.qty": 1 } })
        } catch (error) {
            return `ERROR: ${error}`
        }
    }
    //Si el carro buscado con el ID no tiene producto con el IDproducto proporcionado, ingresar 1, si ya tiene un producto con el ID proporcionado sumar 1 a la cantidad establecida

    delCart = async (params) => {
        try {
            const { cid } = params
            return await cartModel.deleteOne({ _id: cid })
        } catch (error) {
            return `ERROR: ${error}`
        }
    }
}

module.exports = new CartManagerM()