const { promises } = require('fs')
const fs = promises

class UserManager {
    createUser(user) {
        let { name, lastName, age, course } = user
        if (!name || !lastName || !age || !course) return "Todos los campos deben ser completados"
        fs.writeFile()
    }
    storagedUsers() {

    }
}
let objVacio = {
    name: "",
    lastName: "",
    age: "",
    course: ""
}

let objConDatos = {
    name: "Luciano",
    lastName: "Perez",
    age: 26,
    course: "Backend"
}
let test = new UserManager()
console.log(test.createUser(objVacio))

//leer primero el users.json antes de escribir el nuevo archivo, para verificar que no se repitan datos y además para no perder los viejos valores que ya se tengan registrados y además para generar los ID de manera automatica