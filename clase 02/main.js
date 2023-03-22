/*Potenciación (**)*/

//A partir de ECMAScript 7 incluye la potenciacion, que se representa como dos asteriscos y la potencia ejemplo:
let potencia = 5 ** 7
//console.log(potencia);
//En el anterior ejemplo el 5 se eleva a la 7ma potencia, lo que entrega como resultado 78,125, esto facilita la manera en la que se pueden elevar los valores de potencia

/*INCLUDES .includes()*/

/*Él método includes se utiliza para verificar si el valor que le estamos pasando como argumento se encuentra o no en un array, este método devuelve un valor booleano. Ejemplo de funcionalidad:*/
let nombres = ["Ana", "Fer", "Sheyla"]

let busqueda = nombres.includes("Ana")
//console.log(busqueda);
busqueda = nombres.includes("A")
//console.log(busqueda);

/*El método busca solamente palabras completas, no busca letra por letra, también cabe recalcar que el método es Key Sensitive o sea, si la palabra esta escrita con mayusculas y el argumento 
está escrito con minusculas, no encontrará la palabra que se busca */

/*ENTRIES Object.entries()*/

/*Él método Object.entries() devuelve un array de arrays que contienen cada clave-valor de un objeto. Por ejemplo:*/

const computadora = { id: 1, cpu: "Ryzen 5 3600", gpu: "MSI NVIDIA 1660S", hdd: "Seagate 1TB" }
let arrPC = Object.entries(computadora)
//console.log(arrPC);

/*En este ejemplo podemos observar como a partir de cada clave-valor de el objeto "computadora", nos generó un array que contiene arrays con cada clave-valor que componen el objeto
Esto es útil para poder extraer los valores de un objeto por medio de un iterador for...of, por ejemplo:*/

for (const [clave, valor] of arrPC) {
    //console.log(`El valor de la clave ${clave} es: ${valor}`);
    if (clave == "cpu") {
        //console.log(valor);
    }
}

/*En el anterior ejemplo iteramos sobre el array y extraemos los valores que nos son utiles para su utilización. */

/*VALUES Object.values()*/

/*El Object.values() nos devuelve un nuevo array con los valores que contiene el objeto sin extraer la key del objeto. Por ejemplo:*/

const computadoraValues = Object.values(computadora)
//console.log(computadoraValues);

/*KEYS Object.keys()*/

/*El Object.keys() nos devuelve un array con las claves del objeto, ignorando los valores del objeto. Por ejemplo:*/

const computadoraKeys = Object.keys(computadora)
//console.log(computadoraKeys);

/*REDUCE .reduce()*/

/*Reduce es un método que nos sirve para acumular valores. Agarra un conjunto de valores y los regresa en un valor unico. Por ejemplo*/

let numeros = [10, 8, 9, 15, 33]

let totalNumeros = numeros.reduce((contador, itemDelArray) => {
    return contador += itemDelArray
}, 0)
//console.log(totalNumeros);

/*Él método reduce recibe 2 parametros, el primer parametro es una callback la cual puede recibir 4 parametros, el primer parametro de la callback será el acumulador el cual acumula el valor
devuelto por la función callback, es el valor acumulado devuelto en la ultima invocación de callback, en resumen. En el ejemplo anterior el contador toma el valor inicial de 0, cuando el
contador tome la primera posición, ahora tendrá un valor de 10, después se irá a la segunda posición y tendrá el valor de 18, ya que se sumo el 10 + 8, en la tercera posición tendrá el valor
de 27, ya que sumó 18+9 y así sucesivamente. El segundo párametro es el valor de el array en el que se está posicionando, o sea, item del array, cuando comience tendrá el valor de 10
porque ahi es donde se comienza el array, después tendrá el valor de 8, ya que es la segunda posición del array, después tendrá el valor de 9, etc, etc. El tercer párametro es la posición 
actual en la que se encuentra el recorrido si no se le otorga ningun valor, el indice comienza en 0, caso contrario el indice comienza en 1*/

/*SPREAD OPERATOR & DESTRUCTURING*/

/*El destructuring es una manera en la que se pueden almacenar los valores de un objeto en una variable para hacer más accesible su uso. por ejemplo:*/
let persona0 = {
    cabello: "castaño",
    nombre: "Ana",
    edad: 25,
    mejoramiga: true
}
let persona1 = {
    cabello: "negro",
    nombre: "Fernanda",
    edad: 25
}

/*Dados los anteriores objetos, si queríamos acceder a X valor del objeto, se tendría que hacer lo siguiente:*/

let nombrePersona0 = persona0.nombre
//console.log(nombrePersona0);

/*De está manera, ahora ya sería utilizable el valor que fue almacenado en la variable. Con el destructuring, esta sentencia puede ser escrita de la siguiente manera:*/

let { nombre } = persona1
//console.log(nombre);

/*Al valor que se está solicitando se le puede asignar un valor por defecto, en caso de que no encuentre atributo del objeto que se está solicitando. Por ejemplo: */

let { casada = "No se encontró información al respecto" } = persona0
//console.log(casada);

/*Aqui está buscando en el objeto "persona0" si hay algun atributo llamado "casada", al no encontrar ningun atributo con ese nombre, retorna un mensaje por defecto*/

/*Algo a tener en consideración, es que no se puede tener más de un destructuring con el mismo nombre, ya que sigue siendo una declaración de variable y estaría saltando un error. Por ejemplo
no se podría tener otra variable llamada "nombre" perteneciendo a la persona 0, ya que la variable "nombre" está asiganda a la persona1, para este tipo de casos, se utilizan los llamados
alias que es cambiar el nombre de la variable sin afectar a como se llama dentro del objeto. Por ejemplo:*/

let { nombre: NP0 } = persona0
//console.log(NP0);

/*Con el destructuring se puede almacenar de esta manera el valor de la clave que estamos solicitando. El destructuring toma más valor porque puede almacenar más de un valor en su
memoria*/

let { nombre: NP1, edad, mascota, cabello } = persona1
//console.log(NP1);

/*Ahora se guardaron en una sola linea, 5 valores que le pertenecen a un objeto, cuando anteriormente, si se quería guardar más de un valor de un objeto, era básicamente, un valor por linea*/

let nombreP1 = persona1.nombre
let cabelloP1 = persona1.cabello
let edadP1 = persona1.edad
let mascotaP1 = persona1.mascota

/*Antes se tenían que hacer lineas de código como atributos tenía un objeto, ahora es más simple el guardar los atributos de un objeto Y también se le puede hacer destructuring a un array
Para eso se utilizan llaves en ves de corchetes. Por ejemplo:*/

let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let [, , , , , num] = numArray
//console.log(num);
/*El destructuring también se puede emplear con arrays, solamente que como los valores no tienen una key, no se puede acceder al valor directamente mencionando su clave, para acceder a un valor
de un array, se tiene que saber la posición donde se encuentra el valor deseado y colocar tantas posiciones como las que sean necesarias para acceder al valor, como el ejemplo de arriba, que
se colocan varios valores vacios separados por una coma, para poder acceder al numero que está en la posicion 5 que este es el numero 6*/

/*SPREAD OPERATOR (...)*/
/*El spread cumple la función de que: Crea la copia de un objeto y es posible hacer cambios en este nuevo objeto, sin afectar al objeto original. Por ejemplo:*/

let persona2 = persona0
//console.log(persona2);
let persona2Spread = { ...persona0 }
//console.log(persona2Spread);


/*En el anterior ejemplo estámos usando a "persona0" como ejemplo, como se puede ver en el ejemplo aunque parezca que ambos simplemente guardan un objeto, la verdad es que si modificamos los valores de "persona2" el objeto original cambiará sus valores, mientras que en "persona2Spread" el objeto original no los cambiará. Ejemplo:*/

//console.log(persona0)
persona2.cabello = "Rubio"
//console.log(persona0)

/*Como se puede ver, al cambiar el valor de "persona2", "persona0" también cambio el valor original, cosa que si lo hacemos con el spread operator, no pasaría. Ejemplo: */

//console.log(persona0);
persona2Spread.cabello = "Verde"
//console.log(persona0)
//console.log(persona2Spread)

let persona4 = { ...persona0, ...persona1 }
//console.log(persona4);

/*Cuando dentro de una sola variable, se quieren guardar más de un objeto con el spread operator, y los objetos comparten los mismos identificadores de las claves, el objeto se sobreescribe por el ultimo objeto ingresado, y si las claves son diferentes entre objetos, se concatenan en un mismo objeto*/

/*Tamién se pueden guardar el resto de los valores de un objeto si lo desetructuramos con un spread operator. Ejemplo:*/

let { edad: EP1, ...resto } = persona0
//console.log(resto);

/*En el ejemplo anterior guardamos una sola variable aparte que es la edad, y el resto del objeto lo guardamos en otra variable aparte, cabe recalcar que regresa un objeto completo y no sus valores */

/*TRIM .trim() & FLAT .flat()*/

/*Trim remueve los espacios vacios del comienzo y del final (no cuenta los que separa palabras) de una cadena de texto. Por ejemplo*/

let cadenaDeTexto = "                    HOLA TE SALUDO                     "
//console.log(cadenaDeTexto.trim());

/*La cadena de texto contiene muchos espacios al frente y al final del texto, trim se encarga de remover esos espacios pero sin remover los espacios entre las palabras del string*/
/*flat por otro lado, lo que hace es remueve arrays que se encuentren dentro de otro array, conservando los valores que contienen los arrays anidados, por ejemplo:*/

let arr = [1, 2, [3, 4], 5, 6, [7, [8, 9], 10]]
// console.log(arr.flat())
// console.log(arr.flat(2))
// console.log(arr.flat(Infinity))

/*Flat puede recibir un numero como parametro, lo que hace al recibir un numero como parametro, es contar cuantos niveles va a remover las anidaciones, si no se le pasa un valor como párametro, simplemente remueve un nivel al array padre. Infinity es un valor numerico que indica inifito, esto se hace si un array tiene una cantidad incontable de anidaciones y necesitas liberarlas todas.*/

/*DYNAMIC IMPORT */

const calculos = false

const calculadoraEjemplo = async () => {
    if (calculos) {
        //Esto:
        const { Calculadora } = await import("./calculadora.js")
        //Es lo mismo que hacer esto:
        //import { Calculadora } from "./calculadora.js"
        const calculadora = new Calculadora()
        //console.log(calculadora.suma(1, 2))
    }
}
calculadoraEjemplo()

//Lo anterior es una importación dinamica, que solamente importará los datos SI Y SÓLO SI se van a utilizar, en caso de que no se vayan a utilizar, simplemente no los trae, lo que agiliza el programa y también hace que no cargue tantos archivos

/*NULL*/

/*Existen nuevas formas para validar ciertos valores según el tipo de dato que se maneje.*/

let variablePrueba = 0
let variableOR = variablePrueba || "Sin valor"
//console.log(variableOR);

/*En el ejemplo de arriba, el operador OR (||) valida el tipo de dato boolean, ya sea true o false, y dependiendo el valor que reciba. Si el valor que recibe es "truthy" mostrará el primer valor que se le asigne antes del OR (||) y en caso de que sea falsy devolverá el valor establecito por defecto o sea el valor que pongamos después del OR(||) */

let variableNullish = variablePrueba ?? "Sin valor"
//console.log(variableNullish)

/*Por otro lado el operador nullish (??) puede recibir valores como NULL o UNDEFINED, esto mostrará el valor que tenga establecito por defecto después del nullish(??) en caso de que reciba cualquier otro tipo de valor ya sea true, false, string o number así sean valores vacios, retornará el valor que recibió, no retornará el valor establecido por defecto*/

/*Variables privadas*/

/*En las clases constructoras existen las variables privadas, las cuales solamente son accesibles desde la clase constructora, no desde afuera de la clase, esto es útil si queremos tener información privada que no sea accesible desde afuera. Por ejemplo:*/

class Email {
    #password = ""
    constructor(usuario, email, password) {
        this.user = usuario
        this.email = email
        this.#password = password
    }

    #getPassword() {
        return this.#password
    }
}

/*Como se puede ver, arriba se creó una clase que es un email, el cual recibe un usuario y un email, y la contraseña es una variable privada, para hacer una variable privada, basta con agregar el signo de numeral(#) delante del identificador de la variable y con eso ya asignamos la variable como privada, también funciona para hacer métodos privados, como el método getPassword()*/

let nuevoEmail = new Email("MrCaraTortilla", "t@gmail.com", "taquitos23")
console.log(nuevoEmail.email)
console.log(nuevoEmail.password);
console.log(nuevoEmail.getPassword);

/*Al declarar una variable privada, no me es posible acceder a su información desde afuera de la clase, aqui instancié un nuevo objeto al cual le pasé los datos que se requerían, y puedo acceder al email del usuario, pero si quisiera acceder a la contaseña del usuario, no me es posible verla, nisiquiera si uso el identificador, lo mismo para el método getPassword(), aunque conozca el nombre del método, no me es posible acceder a la información de la contraseña */