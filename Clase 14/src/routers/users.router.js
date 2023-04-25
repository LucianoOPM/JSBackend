import { Router, response } from "express";
import userModel from "../models/user.model.js";

const router = Router()

router.get('/', async (req, res) => {
    try {
        let users = await userModel.find()

        res.send({
            status: 'success',
            payload: users
        })
    } catch (error) {
        console.log(`ERROR: ${error}`)
    }
})

router.post('/api/user', async (req, res) => {
    try {
        let user = req.body

        if (!user.first_name || !user.last_name) {
            return res.send({ status: 'failed', payload: "Can't send null values" })
        }

        const newUser = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email
            //Cuando creamos el schema, le otorgamos una estructura por defecto el cual tiene que tener todos los valores para que cree un nuevo documento de manera correcta, si esos valores no los otorgamos de manera correcta, nos arrojará un error.
        }

        let result = await userModel.create(newUser)//En mongoose no se utiliza el sintaxis createOne para crear un solo documento, para crear uno utilizamos el método "create"

        res.send({
            status: 'succes',
            payload: result
        })
    } catch (error) {
        return `ERROR: ${error}`
    }
})

router.put('/api/user/:uid', async (req, res) => {
    try {
        const { params, body } = req
        const { uid } = params

        if (!body.first_name || !body.last_name) {
            return res.send({ status: 'failed', payload: "Can't send null values" })
        }

        let changes = await userModel.updateOne({ _id: uid }, body)

        res.send({
            status: 'succes',
            payload: changes
        })
    } catch (error) {
        return `ERROR: ${error}`
    }
})

router.delete('/api/user/:uid', async (req, res) => {
    try {
        const { uid } = req.params

        if (!uid) {
            return res.send({ status: 'failed', payload: "Can't send null values" })
        }

        let delUser = await userModel.deleteOne({ _id: uid })

        res.send({
            status: 'success',
            payload: delUser
        })
    } catch (error) {
        return `ERROR: ${error}`
    }
})

export default router;