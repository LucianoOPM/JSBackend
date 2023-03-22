let escribirArchivo = (texto, callback) => {
    console.log(texto)

    setTimeout(() => {
        callback()
    }, 1000)
}

module.exports = {
    escribirArchivo
}