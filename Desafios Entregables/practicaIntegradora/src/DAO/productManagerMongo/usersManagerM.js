const { userModel } = require("../models/usersModel");

class UserManager {
    addUser = async (data) => {
        try {
            return await userModel.create(data)
        } catch (error) {
            return `ERROR: ${error}`
        }
    }

    getUsers = async ({ limit, page, sort, query }) => {
        try {
            if (!limit) {
                return await userModel.find({}).limit(10).skip(page * 10).sort({ [query]: sort })
            }
        } catch (error) {
            return `ERROR: ${error}`
        }
    }

    updateUser = async (changes, uid) => {
        try {
            console.log(uid, changes)
            return await userModel.updateOne({ _id: uid }, { $set: { changes } })
        } catch (error) {
            return `ERROR: ${error}`
        }
    }
}

module.exports = {
    UserManager
}

//colocar los demás métodos, implementar multer en la subida de imagenes de los productos.