/*ARROW FUNCTIONS Y FUNCIONES*/

/* 
let xd1 = () => "Hola"
    (let = _ => { return "Hola" })()
let = function () { return "Hola" }()
    (function () {
        return "Hola"
    }())
let xd3 = function () {
    return "Hola"
}
function xd2() {
    return "Hola"
} 
*/

/*Arriba están algunas formas de como se pueden escribir las funciones y funciones autoejecutables */

/*Las arrow functions son un tipo de funciones que tienen ciertos atributos que otras funciones no tienen por ejemplo, cuentan con un return implicito si su declaración no sobrepasa más de una linea de codigo */

let returnImplicito = _ => "Esta función retorna este mensaje si solo se escribe en una linea"
//console.log(returnImplicito());
let sinRetornoImplicito = () => {
    return "Esta función necesita un return porque se escribió en más de una sola linea"
}
//console.log(sinRetornoImplicito());

/*En el anterior ejemplo se pudieron que dos funciones aparentemente se diferencían de que una contiene un return sin utilizar las llaves y sin utilizar la palabra reservada return
porque se escribió sobre la misma linea y la otra función al escribirse en más de una linea, necesita las llaves y el return explicito. Algo a tener en consideración es que, por "buenas
practicas" una función debería tener como máximo dos parametros, y que pasaría si tenemos muchos argumentos para pasar a la función? se puede usar el destructuring como parametro lo que nos 
devuelve un array con los valores que se pasaron como argumento a la función. Por ejemplo:*/

let imprimirNombres = (...nombres) => console.log(nombres);
//imprimirNombres("Luciano", "Fer", "Ana", "Sheyla")