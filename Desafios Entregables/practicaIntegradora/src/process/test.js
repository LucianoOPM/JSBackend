const { Router } = require('express')
const { fork } = require('child_process')//fork es un método de childprocess nativo de nodejs
/*
fork establece una comunicación de canalización(pipe) entre el proceso padre y el proceso hijo, lo que le permite intercambiar datos entre ellos.
*/
const router = Router()

const operacionCompleja = _ => {
    let result = 0
    for (let i = 0; i < 5e9; i++) {
        result += i
    }
    return result
}

router.get('/block', (req, res) => {
    const result = operacionCompleja()
    res.send(`El resultado es: ${result}`)
})
router.get('/noblock', (req, res) => {
    const child = fork('./src/process/funcionCompleja.js')//Cuando sepamos que un proceso tardará mucho en entregar un resultado, lo metemos a un "fork" y le enviamos un evento

    child.send('ejemplo')//El evento message envia un mensaje "puede ser cualquier mensaje" y el proceso process.on detecta todos los eventos.
    child.on('message', (test) => {//Lo que recibimos del proceso hacemos algo, en este caso mostrar en pantalla el resultado

        res.send(`El resultado es: ${test}`)
    })

})
router.get('/process', (req, res) => {//noblock no bloquea el hilo de ejecución de este proceso, mientras que block si lo bloquea
    res.send('hola mundo')
})

module.exports = router