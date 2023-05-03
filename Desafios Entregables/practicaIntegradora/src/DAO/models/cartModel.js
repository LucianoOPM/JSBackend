const { Schema, model, Types } = require('mongoose')

const collection = 'carts'

const cartSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    products: [{
        _id: false,
        idProduct: {
            type: String
        },
        qty: {
            type: Number
        }
    }
    ]
})

const cartModel = model(collection, cartSchema)

module.exports = {
    cartModel
}

/*
carts:
[
    {
        _id: IDCarrito1,
        usuario: IDUser1,
        products:[
            {
                product: IDProducto1,
                qty: 9
            },
            {
                product: IDProducto2,
                qty: 1
            },
            {
                product: IDProducto3,
                qty: 69
            }
        ]
    },
    {
        _id: IDCarrito2,
        usuario: IDUser1,
        products: [
            {
                producto: IDProduct4,
                qty: 1
            }
        ]
    },
    {
        _id: IDCarrito3
    }
]
*/
//Si el usuario tiene un carrito con un producto nuevo a agregar, que lo sume.