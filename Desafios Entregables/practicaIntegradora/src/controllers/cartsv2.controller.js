const { isValidObjectId } = require("mongoose")
const { cartService } = require("../services")

class CartController {
    get = async (req, res) => {
        try {
            const { CID } = req.params
            if (!isValidObjectId(CID)) return res.status(400).sendServerError('Cart isn\'t a valid objectID')

            const product = await cartService.getCarts(CID)
            const { docs } = product
            if (!docs) return res.status(400).sendServerError("Can't find cart")

            res.status(200).sendSuccess(product.docs[0].products)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    addProducts = async (req, res) => {
        try {
            //Destructuración de los datos a manejar, id del carrito, id del producto y la cantidad que por default siempre será 1
            const { CID } = req.params

            const bodyKeys = Object.keys(req.body)
            if (bodyKeys.length === 0) return res.status(400).sendServerError('Empty Body request')

            const { product, quantity = 1 } = req.body

            //Valida que el ID del producto y del carrito sean un objectID valido.
            if (!isValidObjectId(CID) && !isValidObjectId(product)) return res.status(400).sendServerError('Cart ID or Product ID isn\'t a valid object ID')

            //Se busca el carrito por su ID si no lo encuentra, retornamos un error
            let cart = await cartService.findCart(CID)
            if (!cart) return res.status(400).sendServerError('Cart not found')

            //Validamos que el producto que estamos recibiendo, se encuentro o no dentro del carrito
            const productExists = cart.products.findIndex(cartProduct => cartProduct.product._id.toString() === product)

            //Si no se encuentra dentro del carrito, pusheamos el producto entero
            if (productExists === -1) {
                await cartService.pushProduct({ CID, product, quantity })
                cart = await cartService.findCart(CID)
                return res.status(200).sendSuccess(cart)
            }
            //Si se encuentra el producto dentro del carrito simplemente, actualizamos su cantidad total.
            cart = await cartService.updateProduct({ CID, product, quantity })

            res.status(200).sendSuccess(cart)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { CID, PID } = req.params
            const { quantity } = req.body

            if (!isValidObjectId(CID) && !isValidObjectId(PID)) return res.status(400).sendServerError('Some ID is not an valid ObjectID')
            const cartExists = await cartService.findCart(CID)

            const productInside = cartExists.products.findIndex(cartProduct => cartProduct.product.toString() === PID)

            if (productInside === -1) {
                const newProduct = await cartService.pushProduct({ CID, product: PID, quantity })
                res.status(200).sendSuccess(newProduct)
            }

            const updateQuantity = await cartService.updateProduct({ CID, product: PID, quantity })

            res.status(200).sendSuccess(updateQuantity)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    delete = async (req, res) => {
        try {
            const { CID } = req.params
            if (!isValidObjectId(CID)) return res.status(400).sendServerError('Cart ID isn\'t a valid Object ID')

            const cartExists = await cartService.findCart(CID)

            if (!cartExists) return res.status(400).sendServerError('Cart doesn\'t exists')

            const clearCart = await cartService.clearCart(CID)

            res.status(200).sendSuccess(clearCart)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { CID, PID } = req.params
            if (!isValidObjectId(CID) && !isValidObjectId(PID)) return res.status(400).sendServerError('Cart ID or Product ID are not a valid Object ID')

            const { products } = await cartService.findCart(CID)
            const findProduct = products.find(cartProduct => cartProduct.product.toString() === PID)
            if (!findProduct) return res.status(400).sendServerError('Product is not inside of this cart')

            const delProduct = await cartService.delProduct({ CID, PID })

            res.status(200).sendSuccess(delProduct)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
}

module.exports = CartController