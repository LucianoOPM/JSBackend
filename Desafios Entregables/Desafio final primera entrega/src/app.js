const express = require('express')
const app = express()
const productRouter = require('./routers/products.router.js')
const cartRouter = require('./routers/cart.router.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)

app.use('/api/carts', cartRouter)



app.listen(8080, () => {
    console.log('Se inicio correctamente el servidor')
})