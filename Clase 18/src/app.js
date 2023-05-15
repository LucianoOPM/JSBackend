const express = require('express')
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars')
const session = require('express-session')
const { auth } = require('./middlewares/autentication/auth.midd')

const app = express()
//Al conectar cookie parser con express podemos gestionar nuestras peticiones, elementos relacionados a cookies.

//Configuraciones
app.engine('handlebars', hbs.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(`${__dirname}/public`))
app.use(session({
    secret: 'secret word',
    resave: true,//permite tener una sesion activa
    saveUninitialized: true//permite guardar cualquier tipo de sesion
}))
app.use(cookieParser('palabra secreta'))

app.get('/setCookie', (req, res) => {

    res.cookie('galletita', 'entregar cookie', { maxAge: 1000000000 }).send('cookie seteada')
    //Al ser key-value, tenemos que asignarle una key a la cookie que vamos a almacenar, en este caso la key es "galletita", y luego asignamos el valor y de tercer argumento podemos asignarle un tiempo de vida especificado en MS-LEER notas.txt para más información linea 34
})

app.get('/setSignedCookie', (req, res) => {
    res.cookie('signed cookie', 'esta cookie está firmada', { maxAge: 1000000, signed: true }).send('cookie firmada')
})

app.get('/getCookie', (req, res) => {
    //La cookie se recibe por request y se envía por response
    res.send(req.cookies)
})
app.get('/getSignedCookie', (req, res) => {
    //La cookie se recibe por request y se envía por response
    res.send(req.signedCookies)
})

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('galletita').send('cookie eliminada')
})

/*ACTIVIDAD DE CLASE*/
app.get('/login', (req, res) => {

    const values = {
        script: 'login.js'
    }
    res.render('login', values)
})

app.post('/getLoginCookie', (req, res) => {
    const { username, pass } = req.body

    res.cookie(username, pass, { maxAge: 1000000, signed: true }).send({ mensaje: 'registrado' })
})
/*ACTIVIDAD DE CLASE*/


app.get('/session', (req, res) => {
    if (req.session.counter) {
        req.session.counter += 1
        res.send(`Ah visitado la página un total de: ${req.session.counter} veces`)
    } else {
        req.session.counter = 1
        res.send('Bienvenido')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.send({ status: 'error', error: err })
        }
        res.send('log out ok')

    })
})

app.post('/login', (req, res) => {

    const { username, pass } = req.body

    if (username !== 'Luci' || pass !== 'Luci123') {
        return res.send('No se pudo iniciar sesión.')
    }
    req.session.user = username
    req.session.admin = true
    res.send('Se inició sessión')
})

app.get('/privada', auth, (req, res) => {
    res.send('Puedes ver el contenido porque eres admin')
})




app.listen(8080, () => {
    console.log('Escuchando en el puerto 8080')
})