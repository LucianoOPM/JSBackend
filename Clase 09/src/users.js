const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const registerRouter = require('./routers/registers.router.js')

app.use(express.static('./src/public'))
app.engine("handlebars", hbs.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', registerRouter)

app.listen(8080, () => [
    console.log("Se abrió el servidor")
])