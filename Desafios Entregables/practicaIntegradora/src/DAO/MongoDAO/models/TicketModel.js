const { Schema, model } = require('mongoose')

const collection = "ticket"

const ticketSchema = new Schema({
    code: {
        type: String,
        unique: true,
        index: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now
    },
    amount: Number,
    buyer: {
        type: String,
        required: true
    }
})

const ticketModel = model(collection, ticketSchema)

module.exports = ticketModel