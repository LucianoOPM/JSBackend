const productGenerator = require("../utils/productMockGenerator")

class MockingController {
    getProducts = (_req, res) => {
        try {
            const products = []

            for (let i = 0; i < 100; i++) {
                products.push(productGenerator())
            }

            res.status(200).sendSuccess(products)
        } catch (error) {
            res.status(500).sendServerError(error.message)
        }
    }
}

module.exports = MockingController