class ProductManager {
    constructor(products = []) {
        this.products = products
        this.idProduct = 0
    }
    getProducts() {
        return this.products
    }
    getProductById(idProduct) {
        const find = this.products.find(value => value.id === idProduct)

        return find !== undefined ? find : "No se encontró un producto con el ID proporcionado"
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let newProduct = { title, description, price, thumbnail, code, stock }//Se guarda el nuevo objeto a validar
        let productValues = Object.values(newProduct) //Se le extraen los valores al nuevo objeto

        let validateValues = productValues.every(value => value.length !== 0 && value !== " ");//Se valida que el nuevo objeto no contenga espacios vacios o espacios en blanco
        let pushStatus = "" //Variable donde se guardará el mensaje de retorno si el producto fue exitosamente ingresado o no

        if (validateValues) {//Si la validación de los campos vacios es true hace lo siguiente
            let repetedCode = this.products.every(product => product.code.toLowerCase() !== newProduct.code.toLowerCase())//Se valida que el "CODE" de los nuevos productos, no se repita
            if (repetedCode) {//Si el código no se repite, pushea el objeto al array y entrega un mensaje de aprobación
                newProduct.id = this.idProduct += 1//Genera un ID autoincrementable
                this.products.push(newProduct)
                pushStatus = "El producto se ingresó correctamente"
            } else {//Si el código se repite, entrega un código de desaprobación
                pushStatus = "El producto repite su código, favor de verificarlo"
            }
        } else {//Si validatevalues es false, hace esto
            pushStatus = "Por favor verifique que los valores no estén vacíos"
        }
        return pushStatus//Valor de retorno según la agregación del nuevo objeto
    }
}

let producto = new ProductManager()
console.log(producto.getProducts())
console.log(producto.addProduct("Ryzen 5 3600", "Procesador Ryzen 5 3600", 2500, "Sin imagen", "RYZ-5-3600", 15))
console.log(producto.addProduct("NVIDIA 1660s", "Tarjeta de vídeo marca MSI", 4500, "Sin imagen", "MSI-NVIDIA-1660S", 10))
console.log(producto.addProduct("SEAGATE 1000GB", "Disco duro de 1TB 7200RPM", 600, "hdd-seagate.jpg", "SEAGATE-1000GB", 15))
console.log(producto.addProduct("Ryzen 7 3700", "Procesador Ryzen 7", 2500, "Sin imagen", "RYZ-7-3700", 15))
console.log(producto.getProducts())
//console.log(producto.getProductById(5))
