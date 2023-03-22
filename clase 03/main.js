/*Más sobre funciones*/

/*Las funciones anonimas son aquellas funciones que no tienen un identificador, la siguiente función es una funcion anonima autoejecutable que como se puede observar en su sintaxis, los parametros que recibe la función, se hace entre los parentesis que tiene al final de declarar la función*/
((parametro) => { parametro })(
    "Hola mundo"
)
/*MAP .map()*/

/*El método .map() permite recorrer un array y te crea un array nuevo con los valores que se recorrió y si se le hizo alguna modificación, la coloca también en el nuevo array, el método acepta 3 parametros, el primer parametro es el valor individual del contenido del array, el segundo párametro es la posición actual individual del contenido del array y el tercer párametro es el array sobre el cual se está haciendo el recorrido*/

let x = [1, 2, 3, 4, 5, 6]

let x1 = x.map((numeros, posicion, arr) => numeros)
//console.log(x1)//[1, 2, 3, 4, 5, 6]
x1 = x.map((numeros, posicion, arr) => posicion)
//console.log(x1)//[0,1,2,3,4,5]
x1 = x.map((numeros, posicion, arr) => arr)
//console.log(x1)//[[1, 2, 3, 4, 5, 6],[1, 2, 3, 4, 5, 6],[1, 2, 3, 4, 5, 6],[1, 2, 3, 4, 5, 6],[1, 2, 3, 4, 5, 6]]
x1 = x.map((numeros, posicion) => posicion * 2)
//console.log(x1)//[2,4,6,8,10,12]

/*También el .map permite modificar los valores y los devuelve dentro de un array*/

/*CALLBACKS*/

/*Las callbacks son funciones que se pasan como un argumento a otra función*/

let nameRequest = () => {
    return "Ana"
}
let saludar = nombre => {
    return `Hola ${nombre}`
}
//console.log(saludar(nameRequest()))//"Hola Ana"

/*Este es un ejemplo sencillo de como son por dentro las callbacks, pero realmente trabajamos con callbacks día con día, los métodos de los objetos de JS a final de cuentas siguen siendo funciones, y esas funciones pueden recibir como parametro otras funciones, un ejemplo de esto es el mismo método .map()*/

let restoDe2 = (num) => {
    if (num % 2 == 0) {
        return `El número ${num} si es par`
    } else {
        return `El número ${num} no es par`
    }
}
x1 = x.map(restoDe2)
//console.log(x1)//['El número 1 no es par','El número 2 si es par','El número 3 no es par','El número 4 si es par','El número 5 no es par','El número 6 si es par']

/*Estamos ejecutando el mismo método map de arriba, sólo que simplemente ahora estámos creando nosotros mismos la función callback que será llamada en la ejecución de la funcion y está puede ser tan compleja como querramos. Importante a tener en cuenta es que, una función callback no necesita los parentesis de ejecución, se ejecuta automaticamente*/

/*A TENER EN CUENTA:                                                                                                                                                                            Las callbacks SIEMPRE son el último párametro                                                                                                                                                    Las callbacks suelen recibir dos párametros                                                                                                                                                     Las funciones llaman al callback después de terminar la ejecución de todas las operaciones                                                                                                       Si la operación fue exitosa la función llamará al callback pasando null como primer párametro, y si género algún resultado este se pasará como segundo párametro.                               Si la operación resultó en error, la función llamará al callback pasando el error obtenido cómo primer párametro*/

/*Promesas*/
/*Una promesa es un objeto que es la representación final a una petición. Está tiene 3 estados.                                                                                                   pending(pendiente): Este es el estado inicial, significa que la petición no ah sido cumplida ni tampoco rechazada.                                                                                fulfilled(cumplida): Significa que la petición ya fue cumplida con éxito en su ejecución.                                                                                                         rejected(rechazada): Significa que la petición tuvo un fallo/no fue completada con éxito.*/

/*Ejemplo de promesa:*/

const dividir = (num1, num2) => {
    return new Promise((res, rej) => {
        if (num2 === 0) {
            rej("No se puede dividir por 0")
        } else {
            res(num1 / num2)
        }
    })
}
//dividir(1, 0)

//let promesa = new Promise() creación de una promesa como clase
/*En la función dividir, estamos retornando la acción de la ejecución de una función dentro de una nueva instancia la clase promise (recordemos las clases constructoras con sus métodos), la función que recibe la promesa como argumento, tiene dos párametros, comunmente llamados response(res) y reject(rej), siempre en el mismo orden, el primer párametro es la respuesta de la ejecución correcta de la operación y el segundo párametro es la ejecución erronea de la operación. Como tal, la función dividir, ya se ejecuta y nos entrega un resultado por pantalla. Ahora, comunmente cuando se hacen promesas, el resultado se utiliza para ejecutar acciones, para eso, se acceden a los métodos de la promesa instanciada*/

dividir(10, 5)
    .then((res) => {
        //console.log(res)//2
        return res * 10
    }/*,(rej) => {
        console.log(rej + "Hola")
    }*/)
    .then((res) => {
        //console.log(res);//20
    })
    .catch((err) => {
        console.error(err)
    })
    .finally(_ => {
        //console.log("La tarea se ah realizado")//La tarea se ah realizado
    })

/*Cuando se retorna la promesa de nuestra función, tenemos 3 métodos a seguir para los posibles resultados, los cuales son: .then(), .catch() y .finally() los cuales reciben funciones callback en caso de recibir posibles respuestas para realizar su ejecución.*/

/*THEN .then()*/
/*El método then, como su nombre en ingles lo dice, es la acción a seguir cuando la función recibe una respuesta, esté método puede recibir dos argumentos callback, el primer argumento es la acción a seguir en caso de que la respuesta haya sido positiva, el segundo párametro es la acción a seguir en caso de que la respuesta haya sido negativa y ambos retornarán una respuesta para ejecutar el siguiente paso. El método then se puede encadenar para realizar acciones en base a otras acciones*/

/*CATCH .catch()*/
/*El método catch es el que se suele utilizar en caso de que la función haya retornado la respuesta negativa (el then se suele usar para respuestas positivas y no negativas, ese es el trabajo del catch) y como la respuesta es negativa, casi siempre, no se requiere ejecutar ninguna acción, simplemente el ver porqué la ejecución falló*/

/*FINALLY .finally()*/
/*Él método finally se ejecuta siempre sin importar la respuesta del resultado de la promesa ya sea rechazada o aprobada*/

/*NOTA:Cabe recalcar que los métodos anteriormente vistos, trabajan de una manera que hasta que uno no complete su funcionamiento, el otro no comienza su ejecución, es decir funcionan como elementos sincronicos. Cuando en el método then hay algun error con el manejo de información con la respuesta correcta de información, el callback de captura de errores creado sobre el mismo .then() no manejará los errores, ya que este sólo valida los errores rechazados de la función original. en cambio catch, recibe todos los errores, desde los traidos de la función original, hasta los rechazados por los mismos métodos .then()*/

/*Las "Buenas Practicas" de los .then() es que cada uno, debe realizar una acción, por eso mismo, se pueden encadenar tantos then como sean necesarios*/

/*Sincronismo y Asincronismo*/

/*Las ejecuciones sincronicas, son aquellas que no comienzan su ejecución hasta que otra no haya cumplido con su ejecución. Por ejemplo.*/

function funA() {
    console.log(1)
    funB()
    console.log(2)
}
function funB() {
    console.log(3)
    funC()
    console.log(4)
}
function funC() {
    console.log(5)
}
//funA()//1,3,5,4,2

/*Como las funciones en JS trabajan de manera sincronica, no ejecutan los console.log abajo de la función de manera inmediata, tiene que esperar a que haga la ejecución de la función y entonces ahi ejecuta el llamado a la consola y se van desencadenando las demás llamadas a la consola.*/

/*Asincronismo*/

/*Hay veces que tenemos ejecucion de funciones y necesitamos que la respuesta se genere, para eso existen las ejecuciones asincronicas. Estás funcionan a la ves que se ejecutan otras tareas, hay que tener precaución al utilizarlas, ya que si tenemos operaciones que dependan del resultado de estas ejecuciones asincronicas, no funcionarán ya que no tendrán el resultado. Nosotros no controlamos cuando termina su ejecución, solo podemos controlar cuando se comenzarán a ejecutar. Ejemplo de ascincronismo*/

/*
const { escribirArchivo } = require('./escrArch')

console.log("Inicio de la ejecución")

escribirArchivo("Hola mundo", () => {
    console.log("Terminé de escribir el archivo");
})

console.log("fin del programa")
*/

/*En el ejemplo anterior, se importó un archivo que tiene un setTimeOut, el cual es una función asincronica, es decir, que se resuelve al mismo tiempo que se ejecutan las demás funciones, no espera que las demás terminen de ejecutarse para hacer su labor, por lo que el console.log de "fin del programa" no necesita esperar a que la función "escribirArchivo" termine su ejecución para mostrar su contenido.*/

/*Async y await*/

/*Cuando se requieran ejecutar grandes lineas de código .then y .catch no nos servirían, ya que estos nos permiten encadenar las promesas y por buenas practicas, no se puede hacer más de una ejecución por .then(), entonces necesitaremos un entorno más grande si requerimos trabajar grandes cantidades de lineas de código. Para resolver estos problemas del then y el catch, existen unas palabras reservadas las cuales son async y await*/

const funcionAsync = async () => {
    try {
        let resultado = await dividir(10, 2)
        resultado += 5
        //console.log(resultado * 2)//20
    } catch (err) {//Esté catch es el reemplazo del método .catch()
        return err
    }
}
funcionAsync()


/*Antes, para poder ejecutar toda la linea de codigo del resultado, teníamos que anidar un then por linea de ejecución, ahora con el try{}catch{} podemos ejecutar todo el bloque de código de manera directa, sin tener que estár anidando los then, y el manejo de errores sigue siendo el catch y funciona igual. Entonces al terminar de ejecutar todo el bloque de código, como es una función asincronica entonces esta devuelve una promesa, y los métodos de las promesas sigue siendo .then(), pero no son necesarios ya que lo que necesitemos se puede ejecutar dentro del mismo try*/