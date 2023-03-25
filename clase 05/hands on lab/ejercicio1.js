let objNumeros = {}

let i = 0
while (i < 10000) {
    i += 1
    let numAleatorio = Math.ceil(Math.random() * 20)
    !objNumeros[numAleatorio] ? objNumeros[numAleatorio] = 1 : objNumeros[numAleatorio] += 1
}
console.log(objNumeros)