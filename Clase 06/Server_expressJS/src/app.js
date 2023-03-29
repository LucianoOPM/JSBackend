/*TIPOS DE INFORMACIÓN QUE SE SUELEN PEDIR AL SERVIDOR:

1.-Un dato, esto puede ser un nombre, una fecha, una edad...
2.-Información más compleja como un vídeo, imagenes, etc...
3.-Un archivo para descarga.
4.-Incluso una página HTML entera
*/

/*
Un servidor por defecto puede escuchar multiples peticiones del lado del cliente al mismo tiempo.

IMPORTANTE:
Un servidor siempre mandará información a esto se le llama una respuesta o responses del servidor y el cliente es quien hace las peticiones, a esto se le llaman peticiones o requests. Cuando se hace frontend estamos trabajando del lado del cliente, en este caso, nos tocará trabajar del lado del servidor.
*/


/*-------------------------------------------------------------------NODEMON-------------------------------------------

Nodemon es una herramienta que nos permite reiniciar automaticamente el servidor al detectar cambios en el código, esto es util ya que si no fuera así, tendríamos que estar apagando y encendiendo el servidor al momento de actualizar el código de forma manual. Nodemon detecta cualquier cambio en el código, así sea simplemente un console.log

Para instalarlo simplemente corremos npm i -g nodemon(Ya lo tengo instalado. "npm ls" para ver paquetes instalados)
*/

/*-----------------------------------------------------------------------------EXPRESS---------------------------------------------

Express es una herramienta que nos permitira crear servidores más complejos. Este nos ayuda en la utilización de diferentes rutas para manejar las peticiones, mejora la estructura y diseño de nuestro código en el proyecto y más funcionalidades complejas como la utilización de middlewares

Para comenzar un proyecto con express, necesitaremos correr el código de NPM de creación de package.json, ya que al no ser nativo necesitaremos gestionar las dependencias de nuestro proyecto. Para esto corremos el comando: "npm init -y" y eso nos generará un package.json automaticamente.

después instalamos express con: "npm install express" y este nos generará una carpeta llamada "node_modules" donde se almacenará express (Está carpeta la ignoraremos al subir al repositorio con un archivo .gitignore)

Y una ves realizado los pasos anteriores podemos comenzar
*/

/*------------------------------------------------------------------RUTAS-----------------------------------------------*/

/* Cuando navegamos en la red, podemos observar que el URL cambia constantemente al cambiar de página, esto es porque son rutas a las que accedemos para obtener información del servidor donde esta alojado esa ruta, aqui es dónde se inicia ese proceso, recordar que las rutas se dividen con "/" 

const express = require('express')//importacion del modulo express
const app = express()//utilización de la importacion

app.get('/bienvenida', (request, responses) => {
    responses.send("<h1 style='color: blue;'> Bienvenido a mi web</h1>")
})
app.get('/usuario', (request, responses) => {
    responses.send({ id: 1, usuario: "Luciano", contraseña: "123456" })
})

En el ejemplo anterior, cuando el usuario accede a las rutas "/bienvenida" y "/usuario" estámos entregandole al cliente distintas respuestas desde el servidor, en uno es un formato HTML que el navegador es encargado de interpretar, y en el otro es un objeto literal
*/


/*----------------------------------------------------------------REQUEST PARAMS----------------------------------------------------------*/

/*
Se utiliza cuando queremos obtener información dinamica desde el lado del cliente, para poder definir un "párametro" dentro de la ruta a trabajar basta con colocar el simbolo de dos puntos (:) antes del párametro, de está manera le estámos diciendo a express que queremos que este elemento sea dinamico.

su sintaxis es: parametrocallback.params.parametroURL

Lo que se obtiene de la petición es la información con la que se trabajará para darle al cliente una respuesta.

const express = require('express')//importacion del modulo express
const app = express()//utilización de la importacion

app.get('/paginaweb/:nombre', (req, res) => {
    console.log(req.params.nombre)
    res.send(`Bienvenido ${req.params.nombre}`)
})

app.get('/paginaweb/:nombre/:apellido', (req, res) => {
    res.send(`El nombre completo es: ${req.params.nombre} ${req.params.apellido}`)
})

En el ejemplo anterior estamos accediendo a la ruta "/paginaweb" y otorgandole los argumentos a los parametros que pueden tomar cualquier valor que el cliente reciba, para este tipo de casos, hay que hacer validaciones para entregar información concreta que necesite el cliente para funcionar


let usuarios = [
    { id: "1", nombre: "Ana", apellido: "Montiel" },
    { id: "2", nombre: "Luciano", apellido: "Pérez" },
    { id: "3", nombre: "Fer", apellido: "Santos" },
    { id: "4", nombre: "Sheyla", apellido: "Velazquez" }
]
//Mock es una simulación de una base de datos. En este caso usuarios sería un mock

app.get('/', (req, res) => {
    console.log(req.params)
    res.send({ usuarios: usuarios })
})
app.get('/:idUsuario', (req, res) => {
    let { idUsuario } = req.params
    let busqueda = usuarios.find(usuarios => usuarios.nombre.toLowerCase() == idUsuario.toLowerCase())
    //let busqueda = usuarios.find(usuarios => usuarios.nombre.toLowerCase() == req.params.idUsuario.toLowerCase()) Si utilizo esté metodo, elimino el let{idUsuario} = req.params
    if (!busqueda) return res.send({ error: "Error: Su busqueda no tuvo exito" })
    res.send(busqueda)
}) 
*/


/*--------------------------------------------------------req.QUERYS-----------------------------------------------------------*/

/*
Cómo lo indica el nombre, query hace referencia a las distintas consultas que se recibiran como posibles párametros basta con colocar un simple signo de cierre de interrogacion ("?") para que express reconosca que hay que meter información al objeto req.query para poder utilizarlo como endpoint. Cuando buscamos algo en el navegador llamamos a un endpoint haciendo una consulta determinada. Con el simbolo de "&" se encadenan más párametros en el query
*/

const express = require('express')//importacion del modulo express
const app = express()//utilización de la importacion

/*
Conforme incrementa el dinamismo en las URLs, es importante configurar el servidor para que reciba datos más complejos desde la URL por ello hay que utilizar el siguiente código:
*/
app.use(express.urlencoded({ extended: true }))
/*
La linea anterior ayuda al servidor a interpretar mejor los códigos que viajen desde la URL y mapearlos correctamente en el req.query
*/

const usuarios = [
    { id: "1", nombre: "Hu", apellido: "Tao", genero: "F" },
    { id: "2", nombre: "Itto", apellido: "Arataki", genero: "M" },
    { id: "3", nombre: "Ayaka", apellido: "Kamisato", genero: "F" },
    { id: "4", nombre: "Ayato", apellido: "Kamisato", genero: "M" },
    { id: "5", nombre: "Raiden", apellido: "Shogun", genero: "F" },
    { id: "6", nombre: "Barbara", apellido: "Ikuyo", genero: "F" },
    { id: "7", nombre: "Diluc", apellido: "EL SEÑOR DE LA NOCHEEEE", genero: "M" },
    { id: "8", nombre: "Kaeya", apellido: ":)", genero: "P" },
]


/*
app.get('/search', (req, res) => {
    const { nombre, apellido } = req.query
    res.send({ nombre, apellido })
})
*/
app.get('/usuarios', (req, res) => {
    //En el request recibiremos un género
    const { genero } = req.query
    console.log(genero)
    if (!genero || (genero != "M" && genero != "F")) return res.send({ usuarios: usuarios })


    let retornar = usuarios.filter(users => users.genero === genero)
    res.send(retornar)
})


app.listen(8080, () => {
    console.log("El puerto se acaba de abrir en el 8080")
})