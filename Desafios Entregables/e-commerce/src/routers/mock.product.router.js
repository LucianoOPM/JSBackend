const MockingController = require("../controllers/mock.controller");
const RouterClass = require("./RouterClass");
const mocking = new MockingController()

class MockingProductsRouter extends RouterClass {
    init() {
        this.get('/', ['PUBLIC'], mocking.getProducts)
    }
}

module.exports = MockingProductsRouter