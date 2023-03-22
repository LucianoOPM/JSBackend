let suma = (num1, num2) => {
    return new Promise((res, rej) => {
        if (num1 == 0 && num2 == 0) rej("Ambos valores son 0")
        if (num1 == 0 || num2 == 0) rej("Operación innecesaria")
        if (num1 + num2 < 0) rej("La calculadora solo debe devolver valores positivos")
        res(num1 + num2)
    })
}
let resta = (num1, num2) => {
    return new Promise((res, rej) => {
        if (num1 == 0 && num2 == 0) rej("Ambos valores son 0")
        if (num1 == 0 || num2 == 0) rej("Operación invalida")
        if (num1 - num2 < 0) rej("La calculadora solo debe devolver valores positivos")
        res(num1 - num2)
    })
}
let multi = (num1, num2) => {
    return new Promise((res, rej) => {
        if (num1 < 0 && num2 < 0) rej("Los factores son negativos")
        if (num1 * num2 < 0) rej("La calculadora solo debe regresar valores positivos")
        res(num1 * num2)
    })
}
const dividir = (num1, num2) => {
    return new Promise((res, rej) => {
        if (num2 === 0) rej("No se puede dividir por 0")
        res(num1 / num2)
    })
}

let calculos = async (num1, num2, operacion) => {
    try {
        if (operacion.toLowerCase() === "suma") return await suma(num1, num2)
        if (operacion.toLowerCase() === "resta") return await resta(num1, num2)
        if (operacion.toLowerCase() === "division") return await dividir(num1, num2)
        return await multi(num1, num2)
    } catch (error) {
        return error
    }
}
calculos(9, 8, "suma")
    .then((res) => {
        console.log(res);
    })
    .catch((rej) => {
        console.log(rej);
    })

/* suma(9, 8)
    .then((res) => {
        console.log(res)
    })
    .catch((rej) => {
        console.log(rej)
    })

resta(5, 5)
    .then((res) => {
        console.log(res);
    })
    .catch((rej) => {
        console.log(rej);
    })
multi(5, 9)
    .then((res) => {
        console.log(res);
    })
    .catch((rej) => {
        console.log(rej);
    })
dividir(10, 2)
    .then((res) => {
        console.log(res);
    })
    .catch((rej) => {
        console.log(rej)
    }) */