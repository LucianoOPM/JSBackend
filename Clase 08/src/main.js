const express = require('express')
const app = express()
const userRouter = require("./routers/users.router.js")
const productRouter = require('./routers/products.router.js')
const petRouter = require('./routers/pets.routers.js')
const cookieParser = require('cookie-parser')
const { uploader } = require('./utils.js')


//Middleware a nivel endpoint
app.use((req, res, next) => {
    console.log("mid app- time: ", Date.now())
    next()
})//Si este middleware no tiene una continuidad (con la función next()) el archivo terminaría de leer hasta aca, ya que no tiene un endpoint que nos redirija a otro endpoints. Con next, yo le estoy diciendo que siga su camino pero que igual entre por aca y me ejecute lo que tiene adentro, en este caso un simple console.log, pero podrían ser otras cosas más complejas.
//middleware linea 42

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./src/public'))//Cuando se este en la homepage, tomará los archivos publicos que le pasemos como "static" de la carpeta "public"
//app.use('/static', express.static('./src/public')) //También se puede tener una carpeta static "virtual" la cual no es tan accesible desde el URL, ya que se tendría que saber el nombre de la carpeta para poder acceder desde el explorador. Y en el endpoint tenemos que colocar "/static", ya no se accedería desde "/"

app.use('/static', express.static(`${__dirname}/public`)) //Ruta absoluta: "__dirname" me trae la ruta absoluta desde donde se esta llamando y simplemente concatenamos la carpeta a la que se desea acceder. Es muy util para no tener que adivinar en que carpeta está el archivo(messirve)

app.use(cookieParser())//middleware de 3eros


app.post("/single", uploader.single("myfile"), (req, res) => {
    res.status(200).send({ status: "succes", mesagge: "El estado se subió correctamente." })
})


/* app.use("/", (req, res) => {
    res.send("ROOT")
}) *///Si no se tuviera un endpoint al cual acceder, se mostraría este "root" que mandamos como respuesta. Pero como tenemos una carpeta "static" ese archivo tiene prioridad sobre esta request

//Al haberlo configurado correctamente, ahora simplemente tenemos que exportar lo que tenemos en el router de usuarios e importarlo acá directamente.

app.use('/api/usuarios', userRouter)//mid nivel router dentro del router

//Lo que antes definiamos en 3 lineas de código, ahora lo estamos definiendo en otro lugar, exportandolo e importandolo y le decimos a "app" que USE la importación del otro


app.use('/api/productos', productRouter)

/* 
app.use('/api/carrito', userRouter)
*/



app.use("/", petRouter)


/*
Middlewares

un middleware sirve como una conexion entre lo que el usuario envia y lo que le estamos ofreciendo desde la base de datos, y que en caso de que la peticion del usuario no tenga alguna validación que se establecio dentro del middleware, se envie una información diferente. También actúa como intermediario entre diferentes aplicaciones o sistemas. Su función es facilitar la comunicación y el intercambio de datos entre estos sistemas, independientemente de su lenguaje de programación o plataforma. También tiene funciones de seguridad.

Existen distintos tipos de middlewares.

middlewares de aplicacion
middlewares de endpoint
middlewares de router
middlewares de manejo de errores
middlewares incorporados
middlewares de teceros

Recordar que los middlewares si están en orden de prioridad, siempre se ejecutan ANTES y si no tienen una función "next()" no dan el paso a el proceso a seguir.

Cuando es a nivel de manejo de errores, SIEMPRE SE TIENE QUE COLOCAR DESPUÉS DE TODO
*/

app.use((error, req, res, next) => {
    console.log(error)

    res.status(500).send("Todo mal")
})

/*El único middleware incorporado en expressJS es static, que ya se utilizó para incorporar carpetas/archivos estaticos. La sintaxis es:
express.static(root, [options])

Dónde root es el directorio o ruta dónde se incorpora el servicio static y options son opciones adicionales opcionales que pueden ser, dotfiles, etag, extensions, index, lastModified, maxAge, redirect, setHeaders, etc.
*/

app.listen(8080, () => {
    console.log("El puerto se acaba de abrir en el 8080")
}) 
