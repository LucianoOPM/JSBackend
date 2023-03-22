const fs = require('fs')
const fsPromises = fs.promises


class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
    }
    async getProducts() {
        try {
            const data = await fsPromises.readFile(this.path, "utf-8")
            const dataToJson = JSON.parse(data)
            return dataToJson
        } catch (error) {
            return `Se a producido un error al traer el archivo ${error}`
        }
    }
    async getProductById(idProduct) {
        try {
            const read = await fsPromises.readFile(this.path, "utf-8")
            const readToObject = JSON.parse(read)
            const find = readToObject.find(value => value.id === idProduct)
            return find ? find : "No se encontró un producto con el ID proporcionado"
        } catch (error) {
            return `Se a producido un error al traer el archivo ${error}`
        }
    }
    async updateProduct(idProduct, changes) {
        try {
            const read = await fsPromises.readFile(this.path, "utf-8")
            const readToObject = JSON.parse(read)

            const find = readToObject.find(value => value.id === idProduct)
            if (!find)`No se encontró un objeto con el ID: ${idProduct}`

            let guardarID = idProduct
            Object.assign(find, changes)
            find.id = guardarID

            const objectToString = JSON.stringify(readToObject, "null", 2)
            await fsPromises.writeFile(this.path, objectToString, "utf-8")

            return `Se ah modificado el producto con el ID: ${idProduct}`
        } catch (error) {
            return `Se a producido un error al traer el archivo ${error}`
        }
    }
    async deleteProduct(id) {
        try {
            const fetchJson = await fsPromises.readFile(this.path, "utf-8")
            const jsonToObject = JSON.parse(fetchJson)
            const indexProduct = jsonToObject.findIndex((product) => product.id == id)
            if (indexProduct !== -1) {
                jsonToObject.splice(indexProduct, 1)
                let objectToJSON = JSON.stringify(jsonToObject, "null", 2)
                fsPromises.writeFile(this.path, objectToJSON)
                return `Se ah eliminado el objeto con id ${id}`
            }
            return "No se encontró un valor con ese ID"
        } catch (error) {
            return `Se a producido un error al traer el archivo ${error}`
        }
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!fs.existsSync(this.path)) {
            await fsPromises.writeFile(this.path, "[]", "utf-8")
        }
        if (fs.existsSync(this.path)) {
            const fetchData = await fsPromises.readFile(this.path, "utf-8")
            if (fetchData.length === 0) {
                await fsPromises.writeFile(this.path, "[]", "utf-8")
            }
        }
        try {
            let newProduct = { title, description, price, thumbnail, code, stock }

            if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) return "Favor de verificar que todos los valores se hayan ingresado correctamente"

            let repetedCode = this.products.every(product => product.code.toLowerCase() !== newProduct.code.toLowerCase())
            if (!repetedCode) return "El producto repite su código, favor de verificarlo"

            if (this.products.length === 0) {
                this.products.push({ id: 1, ...newProduct })
                let dataToString = JSON.stringify(this.products, "null", 2)
                await fsPromises.writeFile(this.path, dataToString, "utf-8")
                return "El producto se ingresó correctamente"
            }
            this.products.push({ id: this.products[this.products.length - 1].id + 1, ...newProduct })
            let dataToString = JSON.stringify(this.products, "null", 2)
            await fsPromises.writeFile(this.path, dataToString, "utf-8")
            return "El producto se ingresó correctamente"

        } catch (error) {
            return `Se ah producido un error al cargar el producto ${error}`
        }
    }
}

let testProduct = {
    id: 9,
    title: "DeepCool Aerocool",
    description: "Gabinete DeepCool ATX",
    price: 500,
    thumbnail: "Sin imagen",
    code: "DEEP-AERO-XYZ",
    stock: 5
}

let producto = new ProductManager("./Desafios Entregables/Product Manager JSON/data.json")
let pruebas = async () => {
    console.log(await producto.getProducts())
    console.log(await producto.addProduct("Ryzen 5 3600", "Procesador Ryzen 5 3600", 2500, "Sin imagen", "RYZ-5-3600", 15))
    console.log(await producto.addProduct("NVIDIA 1660s", "Tarjeta de vídeo NVIDIA MSI", 4500, "Sin imagen", "MSI-NVI-1660s", 99))
    console.log(await producto.addProduct("Seagate 1TB", "Disco duro de 1TB", 500, "Sin imagen", "SEA-1-TB", 50))
    console.log(await producto.getProductById(1))
    console.log(await producto.updateProduct(1, testProduct))
    console.log(await producto.deleteProduct(3))
    console.log(await producto.getProducts())
}
pruebas()