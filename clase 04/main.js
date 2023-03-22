/*REPASANDO SETTIMEOUT*/

/*Recordemos que la función setTimeOut recibe dos párametros, el primer párametro es una callback que se ejecutará una vez que se cumpla el tiempo(en milisegundos) del segundo párametro. Ejemplo:*/

// let test = (mensaje) => {
//     if (mensaje) {
//         return setTimeout(() => {
//             console.log(mensaje)
//         }, 5000)
//     }
//     console.log("No se recibió ningun mensaje");
// }
// //test("Esté mensaje se mostrará después de 5s")

// let temporizador = (cb) => {
//     setTimeout(() => {
//         cb()
//     }, 5000)
// }
// let operacion = _ => console.log("Realizando tarea")
//temporizador(operacion)

/*Ejecuta una tarea después de que el tiempo (en milisegundos) se haya cumplido*/

/*SETINTERVAL*/

/*Es similar al setTimeOut, solo que este cumplirá con sus tareas repetidas veces, según el tiempo de delay que le pongamos.*/

// let contador = (mensaje) => {
//     let count = 0

//     let timer = setInterval(() => {
//         console.log(count += 1)
//         if (count > 4) {
//             clearInterval(timer)
//         }
//     }, 1000)
// }
//contador()

/*Lo que hace está función es ejecutarme la misma tarea (en este caso) cada 3s antes de que el contador llegue a 4 */

/*Las tareas asincronicas, no intervienen en la ejecución de las tareas que vengan a continuación, es decir, si tengo 3 tareas que cumplir y la tarea asincronica está por encima de las otras dos, las otras dos pueden ejecutarse sin esperar que la tarea asincronica termine su ejecución. NOTA: Si alguna de las otras dos tareas necesita la información que la tarea asincronica me va a traer, esto puede ser un problema, ya que como se ah dicho, nosotros no sabemos cuando terminará su ejecución la tarea asincronica, eso rompería completamente nuestras siguientes tareas*/

/*Persistencia en memoria*/

/*Uno de los grandes problemas en la programación es que un objeto creado para su uso, solamente vive en lo que se ejecuta su programa, una vez terminada la ejecución, los objetos desaparecen hasta que se vuelva a ejevutar el programa*/

/*FILESYSTEM fs*/

/*filesystem ("fs") es un modulo que ya viene instalado por defecto con NodeJS, para poder utilizarlo tenemos que guardar su funcionamiento en una variable para poder utilizarlo cuando lo necesitemos. Para guardar el filesystem, se hace de la siguiente manera: */

//const fs = require("fs")

/*Aqui en la variable "fs" estamos instanciando la clase require, y podemos acceder a todos sus método utilizando la llamada a "fs", sólo debemos utilizarlo llamando a sus métodos como una clase. Esto lo podemos hacer de 3 maneras, síncronico, callbacks o con promesas.*/

/*SINCRONICO*/

/*El uso de "fs" de manera sincronica, es muy sencilla, para ello utilizaremos la palabra "Sync" después de acceder al método que querramos utilizar, hay una gran cantidad de métodos a utilizar, pero de momento nos centraremos en los principales:                                                                                                                             writeFile(): Que se utiliza para crear un archivo si no existe, porque si existe lo sobreescribe.                                                                                          readFile():Que se utiliza para leer un archivo                                                                                                                                           appendFile():Que se utiliza para añadir contenido un archivo                                                                                                                             unlinkFile(): Que funciona para eliminar un archivo.                                                                                                                                         exists(): Que corrobora que un archivo exista*/

//fs.writeFileSync('./clase 04/data.txt', "Hola Coders!", "utf-8")

/*Él método writeFileSync trabaja de manera sincronica (es decir que no interrumpe el hilo de ejecución), este recibe 3 parametro y uno de ellos es opciona, el primer párametro es la ruta donde va a escribir el archivo, en este caso le decimos que sobre nuestra misma carpeta base, acceda a la carpeta "clase 04" y cree el archivo data.text, el segundo párametro es el contenido que tendrá dicho archivo, puede contener variables, y el tercer párametro es opcional, y es el tipo de codificación charset para lectura de caracteres que no vienen incluidos de base*/

//console.log(fs.existsSync('./clase 04/data.txt'))

/*El existsSync es un método que recibe un sólo párametro, el cual es la ruta de la dirección del archivo, este retorna un valor booleano dependiendo si encontró el archivo en la ruta especificada, tal cual y el nombre del archivo, en caso de que la ruta esté mal escrita o el mismo nombre del archivo, entonces retornará false.*/

/*
if (fs.existsSync("./clase 04/data.txt")) {
    fs.appendFileSync("./clase 04/data.txt", " esto es un contenido agregado", "utf-8")
    const contenidoArchivo = fs.readFileSync("./clase 04/data.txt", "utf-8")
    console.log(contenidoArchivo);
}
*/

/*readFileSync es un método de leectura del archivo que recibe dos párametros, el primero es la ruta donde se guarda el archivo que vamos a leer, y el segundo es la codificación meta charset para la lectura de caracteres especiales. Primero se tiene que saber que el archivo que vamos a leer existe, para eso es el existsSync() y una vez que se corrobore que el archivo existe, podemos guardar su contenido en una variable o utilizarla directamente.*/

/*appendFileSync es para la agregación de contenido dentro del mismo archivo, el cual recibe tres parametros, es similar al método de creación de archivos, primero es la ruta del archivo al que le vamos a agregar contenido, el segundo es el contenido a agregar y el tercero es el meta charset de caracteres especiales.*/

//fs.unlinkSync("./clase 04/data.txt")

/*El unlink es un método que elimina el archivo creado, solamente recibe un parametro y es la ruta donde se encuentra ubicado el archivo a eliminar.*/

/*FS CON CALLBACKS */

/*Funciona de manera muy similar a como lo hace con Sync, solo que ahora las funciones reciben un último argumento, el cual es una callback, que como lo vimos en la clase pasada, esta callback tiene un manejo de promesas, esto para saber si la ejecución salió bien, o si salió mal. Sólo el ReadFile maneja un segundo argumento como resultado a la lectura del archivo. Estos métodos siguen siendo asincronos así que hay que tener cuidado donde se usan.*/

// const fs = require("fs")

// fs.writeFile("./clase 04/texto.txt", "Hola Coders!", "utf-8", (err) => {
//     if (err) {
//         return console.log(err)
//     }
// })

// fs.appendFile("./clase 04/texto.txt", ". Esto es un valor agregado", "utf-8", (rej) => {
//     if (err) {
//         return console.log(rej)
//     }
// })

// fs.readFile("./clase 04/texto.txt", "utf-8", (rej, res) => {
//     if (rej) return console.log("Ah ocurrido un error")
//     console.log(res)
// })

// fs.unlink("./clase 04/texto.txt", (err) => {
//     if (err) return console.log("archivo eliminado")
// })

/*Como se puede ver en los ejemplos, todos los métodos son similares, solo que de ultimo argumento está la callback de manejo de promesas. Se puede notar que el unico que tiene dos parametros dentro de la callback, es el readfile, ya que es el unico que nos retornará el valor del contenido que fue leído por la función*/

/*FS con promises*/

/*El método de empleo es básicamente lo mismo que la utilización de las callbacks, sólo que nos olvidamos de las callbacks y utilizamos las promesas. Para poder usar filesystem con las promesas se tendría que hacer de la siguiente forma: */

// const fs = require("fs")
// fs.promises.writeFile("./clase 04/texto.txt", "Contenido del texto", "utf-8"/*,()=>{}*/)

/*Cómo se puede observar con las promesas, nos podemos olvidar de usar las callbacks para el manejo de las respuestas y en su caso usamos las promesas, y utilizaremos nuestros amigos .then() y  .catch() para el manejo de las promeas. Ahora, para este tipo de casos, podemos usar el destructuring para hacer más cortas las cosas, por ejemplo:*/

const { promises } = require('fs')
const fs = promises

// fs.writeFile("./clase 04/texto.txt", "Esto es un texto de ejemplo", "utf-8")
//     .then(_ => {
//         return console.log("Termino de escribirse el archivo")
//     })
//     .catch((err) => {
//         return console.log(err)
//     })

/*Desestructuramos las promesas, y eso nos permite ahorrarnos lineas de comandos para hacer las funciones y los métodos más legibles*/

// const lecturaAsincronica = async () => {
//     try {
//         await fs.appendFile("./clase 04/texto.txt", ". Más texto a entregar", "utf-8")
//         let contenido = await fs.readFile("./clase 04/texto.txt", "utf-8")
//         console.log(contenido)

//         await fs.unlink("./clase 04/texto.txt")
//     } catch (error) {
//         console.log(error)
//     }
// }
// lecturaAsincronica()

/*Cómo ahora manejamos datos con promesas, también podemos utilizar el try y catch para operaciones que requieran más de una simple ejecución de lineas de código, si queremos hacer todo un complejo sistema de bloques de código, se utiliza el try y el catch*/

/*JSON*/

/*Recordemos que JSON necesita cadenas de texto para poder guardar el contenido, para hacer un objeto que sea disponible en formato json, existe el método json.stringify y si lo queremos devolver a un objeto javascript existe el json.parse*/

const lecturaJson = async () => {
    try {
        let fetchJson = await fs.readFile("./clase 04/package.json")
        const parseJson = JSON.parse(fetchJson)
        return parseJson
    } catch (error) {
        return error
    }
}
lecturaJson()
    .then((res) => {
        console.log(res)
    })