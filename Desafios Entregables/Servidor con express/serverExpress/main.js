const { promises } = require('fs')//Importación de filesystem
const fs = promises//utilización de FS con promesas
const path = "./managerData/data.json"//Path para dirigirme a donde tengo el almacen de los productos

const express = require('express')//Importación de express
const app = express()//utilización de express
app.use(express.urlencoded({ extended: true }))//mejora la interpretación de express


const fetchData = async () => {
    try {
        let content = await fs.readFile(path, "utf-8")
        let contentToJSON = JSON.parse(content)//Esto de aqui es el array de objetos
        return contentToJSON
    } catch (error) {
        return `Error: ${error}`
    }
}

/*data.json solamente se ingresaron un total de 10 productos*/


app.get('/products', async (req, res) => {
    try {
        let data = await fetchData()
        const { limit } = req.query
        let number = parseInt(limit)
        if (!limit || (isNaN(number))) return res.send(data)

        let limitProduct = data.slice(0, number)
        return res.send(limitProduct)

    } catch (error) {
        return `ERROR: ${error}`
    }
})

app.get('/products/:productID', async (req, res) => {
    try {
        const data = await fetchData()
        const { productID } = req.params
        let number = parseInt(productID)
        if (!productID || (isNaN(number))) return res.send(data)
        if (number > data.length) return res.send("<body style='background-color: black;'><h1 style='color:white;'>Error: El producto no existe</h1></body>")
        let findProduct = data.find(product => product.id === number)
        return res.send(findProduct)
    } catch (error) {
        return `ERROR: ${error}`
    }
})


app.listen(8080, () => {
    console.log("El puerto se a iniciado")
})