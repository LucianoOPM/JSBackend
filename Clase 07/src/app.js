const express = require('express')
//const { send } = require('process')
const app = express()


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let frase = 'Frase inicial, generada gracias al poder del guión, y esto es genial'

app.get('/api/frase', (req, res) => {
    res.send({ frase: frase })
})
//check: Listo

app.get('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params
    const strToArr = frase.split(" ")
    const parseNum = parseInt(pos)

    if (isNaN(parseNum)) return res.send(`ERROR: The value has to be a number`)
    if (parseNum < 1) return res.send("ERROR: The number can't be less than 1")
    if (parseNum > strToArr.length) return res.send("ERROR: The value is greater than length string.")

    const find = strToArr[parseNum - 1]

    if (find.endsWith(',')) return res.send({ buscada: find.slice(0, -1) })

    res.send({ buscada: find })
})
//check: listo

app.post('/api/palabras', (req, res) => {
    const { palabra } = req.body
    const splitFrase = frase.split(" ")
    splitFrase.push(palabra)

    if (!palabra) return res.send("ERROR: El campo no puede estar vacío")
    frase = splitFrase.join(" ")

    res.send({ agregada: palabra, pos: splitFrase.length })
})
//check: listo

app.put('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params
    const posParse = parseInt(pos)
    let { palabra } = req.body
    const splitWord = frase.split(" ")

    if (isNaN(posParse)) return res.send(`ERROR: The value has to be a number`)
    if (posParse < 1) return res.send("ERROR: The number can't be less than 1")
    if (posParse > splitWord.length) return res.send("ERROR: The value is larger than string length.")

    let old = splitWord.splice(posParse - 1, 1, palabra)

    if (old[0].endsWith(",")) {
        palabra += ","
        splitWord[posParse - 1] = palabra
        old[0] = old[0].slice(0, -1)
        frase = splitWord.join(" ")
        return res.send({ actualizada: palabra, anterior: old[0] })
    }
    frase = splitWord.join(" ")
    res.send({ actualizada: palabra, anterior: old[0] })
})


app.delete('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params
    const numParse = parseInt(pos)

    if (isNaN(numParse)) return res.send("ERROR: The value has to be a number")
    if (numParse < 1) return res.send("ERROR: The number can't be less than 1")

    const splitFrase = frase.split(" ")

    if (numParse > splitFrase.length) return res.send("ERROR: The value is larger than string length.")

    splitFrase.splice(numParse - 1, 1)
    frase = splitFrase.join(" ")
    res.send("Palabra eliminada con éxito!")
})

app.listen(8080, () => {
    console.log("Se ah iniciado el server en el puerto 8080")
})