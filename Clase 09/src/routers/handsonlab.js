const express = require('express')
const handlebars = require('express-handlebars')


const app = express()

const food = [
    { name: "Sushi", price: 170 },
    { name: "Hamburguesa", price: 100 },
    { name: "Kilo de trompo", price: 150 },
    { name: "Atún", price: 50 },
    { name: "Empanadas", price: 80 }
]

const users = [
    { nombre: "Luffy D.", apellido: "Monkey", edad: "18", correo: "monkeyDluffy@gmail.com", telefono: "123456", role: "admin" },
    { nombre: "Zoro", apellido: "Ronoroa", edad: "22", correo: "zoro@gmail.com", telefono: "789123", role: "admin" },
    { nombre: "Robin", apellido: "Nico", edad: "31", correo: "robin@gmail.com", telefono: "456789", role: "user" },
    { nombre: "Nami", apellido: "Nami", edad: "19", correo: "nami@gmail.com", telefono: "123456", role: "user" },
    { nombre: "Sanji", apellido: "Vinsmoke", edad: "23", correo: "3nji@gmail.com", telefono: "789123", role: "user" }
]


app.engine("handlebars", handlebars.engine())
app.set('views', `./src/views`)
app.set('view engine', 'handlebars')


app.get('/vista', (req, res) => {
    const ruser = users[Math.ceil(Math.random() * users.length - 1)]

    const test = {
        title: "mercaditoLuci",
        ruser,
        isAdmin: ruser.role === "admin",
        food
    }

    res.render('index', test)
})

app.use((error, req, res, next) => {
    console.log(error)

    res.status(500).send("Todo mal")
})

app.listen(8080, () => {
    console.log("Se abrió el servidor.")
})