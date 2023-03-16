let datos = "./datos/data.json"

let usarDatos = (informacion) => {

}

fetch(datos)
    .then((data) => {
        return data.json()
    })
    .then((test) => {
        usarDatos(test)
    })
    .catch((err) => {
        console.error(err)
    })