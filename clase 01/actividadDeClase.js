const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arrayVacio = []

const mostrar = (values) => {
    if (values.length !== 0) {
        values.forEach(value => {
            console.log(value);
        });
    } else {
        return "Arreglo vacio"
    }
    return "Fin del conteo"
}

console.log(mostrar(array))