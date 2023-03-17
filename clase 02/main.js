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
    edad: 25
}
let persona1 = {
    cabello: "negro",
    nombre: "Fernanda",
    edad: 25,
    mascota: true
}

/*Dados los anteriores objetos, si queríamos acceder a X valor del objeto, se tendría que hacer lo siguiente:*/

let nombrePersona0 = persona0.nombre
//console.log(nombrePersona0);

/*De está manera, ahora ya sería utilizable el valor que fue almacenado en la variable. Con el destructuring, esta sentencia puede ser escrita de la siguiente manera:*/

let { nombre } = persona1
//console.log(nombre);

/*Al valor que se está solicitando se le puede asignar un valor por defecto, en caso de que no encuentre atributo del objeto que se está solicitando. Por ejemplo: */

let { casada = "No se encontró información al respecto" } = persona0
console.log(casada);

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

let [, , , , , num1] = numArray

console.log(num1);

let persona2 = { ...persona0 }
//console.log(persona2)
persona2 = persona0
//console.log(persona2)

let persona3 = {
    cabello: "negro",
    nombre: "Sheyla",
    edad: 23
}
let { nombre: p3, ...rest } = persona3

//console.log(rest)

let x = [1, 2, 3, 4, 5, 6]

let x1 = x.map((numeros, posicion) => numeros)
//console.log(x1)
x1 = x.map((numeros, posicion) => posicion)
//console.log(x1);
x1 = x.map(numeros => numeros * 2)
//console.log(x1);

/*El método .map() permite recorrer un array y te crea un array nuevo con los valores que se recorrió y si se le hizo alguna modificación, la coloca también en el nuevo array, el método acepta 3 
parametros, la explicación anterior funciona si el método solo recibe un párametro, si se le otorga un segundo párametro, indica la posición donde se encuentra dicho valor y como tercer párametro
el método recibe un array*/