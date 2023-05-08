const { Schema, model } = require('mongoose')

const collection = 'products'

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    thumbnail: [{
        type: String
    }],
    code: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    stock: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean
    },
    category: {
        type: String,
        required: true
    }
})

const productModel = model(collection, productSchema)

module.exports = {
    productModel
}