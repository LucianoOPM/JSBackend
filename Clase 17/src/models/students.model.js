const { Schema, model } = require('mongoose')

const collection = 'students'

const studentsSchema = Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    grade: Number,
    group: String
})

const studentModel = model(collection, studentsSchema)

module.exports = {
    studentModel
}