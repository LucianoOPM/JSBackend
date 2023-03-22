const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arrayVacio = []

const mostrar = (values) => {
    if (values.length !== 0) {
        values.forEach(value => {
            console.log(`El valor del arreglo en la posición ${value - 1} es: ${value} Y la longitud del arreglo es: ${values.length}`);
        });
    } else {
        return "Arreglo vacio"
    }
    return "Fin del conteo"
}

console.log(mostrar(array))