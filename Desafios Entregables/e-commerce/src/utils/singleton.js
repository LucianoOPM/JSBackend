const { connect } = require('mongoose')

class MongoSingleton {
    static #instance
    constructor() {
        connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }
    static getInstance = () => {

        if (this.#instance) {
            console.log('Database is already connected.');
            return this.#instance
        }

        this.#instance = new MongoSingleton()
        console.log('Database connected');
        return this.#instance
    }
}

module.exports = MongoSingleton