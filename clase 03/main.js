let x = [1, 2, 3, 4, 5, 6]

let x1 = x.map((numeros, posicion) => numeros)
//console.log(x1)
x1 = x.map((numeros, posicion) => posicion)
//console.log(x1);
x1 = x.map(numeros => numeros * 2)
//console.log(x1);

let nombres = ["Ana", "Fer", "Sheyla"]

let buscar = nombres.includes("Fer")
//console.log(buscar)
buscar = nombres.includes("fer")
//console.log(buscar)
buscar = nombres.includes("Xavier")
//console.log(buscar);
buscar = nombres.includes("yla")
//console.log(buscar)


let persona0 = {
    cabello: "castaño",
    nombre: "Ana",
    edad: 25
}
let persona1 = {
    cabello: "negro",
    nombre: "Fernanda",
    edad: 25,
    mascota: true
}

let { edad = 10 } = persona1
//console.log(edad)
let persona2 = { ...persona0 }
console.log(persona2)
persona2 = persona0
console.log(persona2)

let persona3 = {
    cabello: "negro",
    nombre: "Sheyla",
    edad: 23
}
let { nombre: p3, ...rest } = persona3

//console.log(rest)