class ProductDto {
    constructor(product) {
        this.idProduct = product.id
        this.title = product.title
        this.description = product.description
        this.price = product.price
        this.thumbnails = product.thumbnail
        this.code = product.code
        this.status = product.stock === 0 ? false : true
        this.stock = product.stock
        this.category = product.category
    }
}

module.exports = ProductDto