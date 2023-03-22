class ProductManager {
    constructor(products = []) {
        this.products = products
    }
    getProducts() {
        return this.products
    }
    getProductById(idProduct) {
        const find = this.products.find(value => value.id === idProduct)
        return find ? find : "No se encontró un producto con el ID proporcionado"
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let newProduct = { title, description, price, thumbnail, code, stock }

        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) return "Favor de verificar que todos los valores se hayan ingresado correctamente"

        let repetedCode = this.products.every(product => product.code.toLowerCase() !== newProduct.code.toLowerCase())
        if (!repetedCode) return "El producto repite su código, favor de verificarlo"

        if (this.products.length === 0) {
            this.products.push({ id: 1, ...newProduct })
            return "El producto se ingresó correctamente"
        }
        this.products.push({ id: this.products[this.products.length - 1].id + 1, ...newProduct })
        return "El producto se ingresó correctamente"
    }
}

let producto = new ProductManager()
console.log(producto.getProducts())
console.log(producto.addProduct("Ryzen 5 3600", "Procesador Ryzen 5 3600", 2500, "Sin imagen", "RYZ-5-3600", 15))
producto.addProduct("NVIDIA 1660s", "Tarjeta de vídeo marca MSI", 4500, "Sin imagen", "MSI-NVIDIA-1660S", 10)
producto.addProduct("SEAGATE 1000GB", "Disco duro de 1TB 7200RPM", 600, "hdd-seagate.jpg", "SEAGATE-1000GB", 15)
console.log(producto.addProduct("Ryzen 7 3700", "Procesador Ryzen 7", 2500, "Sin imagen", "ryz-5-3600", 15))
console.log(producto.addProduct("NVIDIA 1660s", "Tarjeta de vídeo marca MSI", 4500, "Sin imagen", "MSI-NVIDIA-1660S", 10))
console.log(producto.addProduct("SEAGATE 1000GB", "Disco duro de 1TB 7200RPM", 600, "hdd-seagate.jpg", "SEAGATE-1000GB", 15))
console.log(producto.addProduct("Ryzen 7 3700", "Procesador Ryzen 7", 2500, "Sin imagen", "RYZ-5-3600", 15))
console.log(producto.getProducts())
console.log(producto.getProductById(3))
console.log(producto.getProductById(4))