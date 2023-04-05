const path = "./managerData/data.json"//Path para dirigirme a donde tengo el almacen de los productos
const { ProductManager } = require("../managerData/proManJSON")
const Manager = new ProductManager(path)

const express = require('express')//Importación de express
const app = express()//utilización de express
app.use(express.urlencoded({ extended: true }))//mejora la interpretación de express

app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query
        res.send(await Manager.getProducts(limit))
    } catch (error) {
        return `ERROR: ${error}`
    }
})

app.get('/products/:productID', async (req, res) => {
    try {
        const { productID } = req.params
        let number = parseInt(productID)
        res.send(await Manager.getProductById(number))
    } catch (error) {
        return `ERROR: ${error}`
    }
})


app.listen(8080, () => {
    console.log("El puerto se a iniciado")
})