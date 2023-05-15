const { Router } = require('express')
const router = Router()

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

router.get('/', (req, res) => {
    const ruser = users[Math.ceil(Math.random() * users.length - 1)]

    const test = {
        title: "mercaditoLuci",
        ruser,
        isAdmin: ruser.role === "admin",/*Este es el condicional que evalua las condiciones puestas en index.handlebars para que tenga en consideración si un usuario es admin o no. */
        food,
        style: 'index.css'/*Este es el nombre del archivo que la carpeta virtual static va a ir a buscar a la ruta que se le haya pasado. */
    }

    res.render('index', test)
})
/* router.get('/register', (req, res) => {
    res.render('register', {
        style: 'index.css'
    })
}) */


module.exports = router