class ProductManager {
    constructor(products = []) {
        this.products = products
    }
    getProducts() {
        return this.products
    }
    getProductsById(idProduct) {
        let arrProducts = this.products
        const find = arrProducts.find(value => value.id === idProduct)

        return find !== undefined ? find : "No se encontró un producto con el ID proporcionado"
    }

    static idProduct = 0

    addProduct(title, description, price, thumbnail, code, stock) {
        let newProduct = { title, description, price, thumbnail, code, stock }
        let productValues = Object.values(newProduct)

        let validateValues = productValues.every(value => value.length !== 0 && value !== " ");

        let pushStatus = ""

        if (validateValues) {
            let products = this.products
            let count = 0
            products.forEach((product) => {
                let insertedValues = Object.values(product)
                for (let i = 0; i < insertedValues.length; i += 1) {
                    if (insertedValues[i] === productValues[i]) {
                        count += 1
                    }
                }
            })
            if (count > 5) {
                pushStatus = "Error, el producto repite ciertos campos"
            } else {
                const id = ProductManager.idProduct += 1
                newProduct.id = id
                products.push(newProduct)
                pushStatus = "El producto se agregó correctamente"
            }
        } else {
            pushStatus = "Por favor verifique que los valores no estén vacíos"
        }
        return pushStatus
    }
}

let producto = new ProductManager()
console.log(producto.addProduct("Ryzen 5 3600", "Procesador Ryzen 5 3600", 2500, "Sin imagen", "RYZ-5-3600", 15))
console.log(producto.addProduct("NVIDIA 1660s", "Tarjeta de vídeo marca MSI", 4500, "Sin imagen", "MSI-NVIDIA-1660S", 10))
console.log(producto.addProduct("SEAGATE 1000GB", "Disco duro de 1TB 7200RPM", 600, "hdd-seagate.jpg", "SEAGATE-1000", 15))
console.log(producto.addProduct("Ryzen 7 3700", "Procesador Ryzen 7", 2500, "Sin imagen", "RYZ-7-3700", 15))
console.log(producto.getProducts())
// console.log(producto.getProductsById(3))
// console.log(producto.getProductsById(4))