const { Router } = require('express')
const router = Router()

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
Middleware a nivel endpoint
*/
const mid1 = (req, res, next) => {
    //req.dato1 = "dato 1"

    res.send("No tienes permisos de acceder a la información")
}

const mid2 = (req, res, next) => {
    req.dato2 = "Mensaje secreto de la nasa"

    //res.send("Se puede acceder a la info")
    next()
}

/*
Para que un middleware tenga funcionamiento dentro de un endpoint, se coloca ANTES de la función de retorno de datos.
*/

//O también podría ejecutarse de la siguiente forma: 
//router.use(mid1) Pero esta forma TIENE que colocarse al principio PARA QUE SE VALIDE ANTES de acceder a los routers.
router.get("/", mid2, (req, res) => {
    const { genero } = req.query

    res.send({ usuarios: usuarios, req: req.dato2 })

    /*     if (!genero || (genero != "M" && genero != "F")) return res.send({ usuarios: usuarios })
    
    
        let retornar = usuarios.filter(users => users.genero === genero)
        res.send(retornar) */
})











/* router.get("/", (req, res) => {
    const { genero } = req.query

    if (!genero || (genero != "M" && genero != "F")) return res.send({ usuarios: usuarios })


    let retornar = usuarios.filter(users => users.genero === genero)
    res.send(retornar)
}) */
//Esta es la estructura básica de como individualizaremos los archivos para poder tener el código más limpio
//A notar que lo que está haciendo router es lo mismo que hacía app, simplemente enrutando.

router.post("/", (req, res) => {
    let user = req.body

    if (!user.nombre || !user.apellido) {
        return res.status(400).send({ status: "error", mensaje: "Error" })
    }
    usuarios.push(user)
    res.status(200).send({ usuarios })
})

router.put("/:pid", (req, res) => {
    const { pid } = req.params
    const user = req.body
    console.log(user)

    if (!user.nombre || !user.apellido) {
        return res.status(400).send({ status: "error", mensaje: "Error" })
    }
    const index = usuarios.findIndex(usuarios => usuarios.id === pid)
    if (index === -1) return res.send({ status: "error", message: "No" })

    res.send({ users: index })
})


router.delete("/:uid", (req, res) => {
    let { uid } = req.params

    const index = usuarios.findIndex(usuario => usuario.id === uid)

    if (index === -1) {
        return res.send({ status: "error", message: "No" })
    }

    res.send({ status: "succes", payload: "Usuarios" })
})
module.exports = router