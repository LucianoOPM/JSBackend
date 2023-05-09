const express = require('express')
const hbs = require('express-handlebars')
const { connectDB } = require('./config/DBConnection')
const { orderModel } = require('./models/pizzas.model')
const { studentModel } = require('./models/students.model')
const { userModel } = require('./models/users.model')
const paginate = require('mongoose-paginate-v2')
//const { estudiantes } = require('./config/students')
//const { ordenes } = require('./config/orders')

const app = express()
connectDB()

app.engine('handlebars', hbs.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(`${__dirname}/public`))


app.get('/pizzas', async (req, res) => {
    try {
        //Inserción de los documentos en el mock.
        //await orderModel.insertMany(ordenes)

        //solicitud de documentos.
        //const data = await orderModel.find({})

        //Ejemplo de stages
        let { pizzaSize } = req.query
        const resultOrders = await orderModel.aggregate([
            //pasos a seguir
            //Recordar que el resultado del stage es el input del siguiente stage
            {
                //Primer stage del pipeline: traer de la base de datos, los documentos que en "size" sean "medium"
                //$match: { size: "medium" }
                $match: { size: pizzaSize }
            },
            {
                //segundo stage: agrupar los resultador mediante su nombre y sumar el total de pizzas que son.
                $group: { _id: "$name", totalQty: { $sum: "$quantity" }, totalPrice: { $sum: { $round: [{ $multiply: ["$price", "$quantity"] }] } } }
            },
            {
                //tercer Stage: Acomodamos de manera descendiente los resultados en base a su cantidad total de pedidos
                $sort: { totalQty: -1 }
            },
            {
                //cuarto stage: Agrupamos todo el resultado en una objeto con clave "orders" y TODA la raiz de la pipeline se guardará en orders. Al colocar el _id en 1, le decimos que genere un ID, si lo colocaramos en 0, sería que no tuviera un _id
                $group: { _id: 1, orders: { $push: '$$ROOT' } }
            },
            {
                //Acá le decimos que genere un nuevo documento, que no tenga un ID autogenerado y que simplemente en la clave "orders" guarde TODO lo que el stage anterior generó en "orders"
                $project: {
                    "_id": 0,
                    orders: "$orders"
                }
            },
            {
                //Acá le colocamos el nombre al proyecto anteriormente creado y le colocamos el nombre de "ordersLog"
                $merge: {
                    into: "ordersLog"
                }
            }
        ])

        res.send({
            mensaje: "success",
            resultOrders
        })
    } catch (error) {
        return `ERROR: ${error}`
    }
})


app.get('/students', async (req, res) => {
    try {
        //insercion de estudiantes y ordenes
        //const dataStudents = await studentModel.insertMany(estudiantes)
        //const dataStudents = await studentModel.insertMany(ordenes)

        const studentsPipeline = await studentModel.aggregate([

            /* 
            Obtener a los estudiantes agrupados por calificación del mejor al peor
            {
                $group: { _id: '$grade', students: { $push: "$$ROOT" } }
            },
            {
                $sort: { _id: -1 }
            }
            */
            /*
            Obtener a los estudiantes agrupados por grupo.
            {
                $group: { _id: "$group", students: { $push: { name: "$first_name" } } }
            }
            */
            /*
            Obtener el promedio de los estudiantes del grupo 1B
            {
                $match: { group: "1B" }
            },
            {
                $group: { _id: "$group", avgGrade: { $avg: "$grade" } }
            }
            */
            /*
            Obtener el promedio de los estudiantes del grupo 1A
            {
                $match: { group: "1A" }
            },
            {
                $group: { _id: "$group", avgGrade: { $avg: "$grade" } }
            }
            */
            /*
            Obtener el promedio general de los estudiantes.
            {
                $group: { _id: "PromedioGral.", total: { $avg: "$grade" } }
            }
            */
            /*
            Obtener el promedio de calificación de los hombres
            {
                $match: { gender: "Male" }
            },
            {
                $group: { _id: "Calificacion hombres", total: { $avg: "$grade" } }
            }
            */
            /*
            obtener el promedio de calificacion de las mujeres 
            {
                $match: { gender: "Female" }
            },
            {
                $group: { _id: "Calificacion hombres", total: { $avg: "$grade" } }
            }
            */
        ])
        res.send({
            status: "success",
            studentsPipeline
        })
    } catch (error) {
        return `ERROR: ${error}`
    }
})

app.get('/users', async (req, res) => {
    try {
        //const x = await userModel.find()

        //Mongoose paginate
        const { page = 1 } = req.query
        let users = await userModel.paginate({}, {
            limit: 10,
            page: page,
            lean: true
        })
        console.log(users)
        const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } = users

        res.render('users', {
            status: 'success',
            payload: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage
        })
    } catch (error) {
        return `ERROR: ${error}`
    }
})

app.listen(8080, () => {
    console.log('Escuchando en el puerto 8080')
})