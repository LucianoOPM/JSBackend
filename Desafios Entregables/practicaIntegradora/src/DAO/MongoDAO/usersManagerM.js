const { userModel } = require("../MongoDAO/models/usersModel.js");

class UserManager {

    addUser = async (data) => {
        try {
            return await userModel.create(data)
        } catch (error) {
            if (error) {
                throw error
            }
        }
    }

    getUsers = async (query) => {
        try {
            return await userModel.paginate(query[0], query[1])
        } catch (error) {
            throw error
        }
    }

    changePassword = async ({ email, newPassword }) => {
        try {
            const test = await userModel.findOneAndUpdate({ email }, { $set: { password: newPassword } })
            return test
        } catch (error) {
            return `ERROR: ${error}`
        }
    }

    findUser = async (id) => {
        try {
            if (id.includes('@')) return await userModel.findOne({ email: id })//Si el ID contiene un @ es porque es un email y efectua la busqueda por email
            return await userModel.findById(id).lean()//Si no, efectua la busqueda por ID del usuario.
        } catch (error) {
            return `ERROR: ${error}`
        }
    }

    updateUser = async (id, body) => {
        try {
            await userModel.findOneAndUpdate({ _id: id }, { $set: body })
            return await userModel.findOne({ _id: id })
        } catch (error) {
            throw error
        }
    }

    deleteUser = async (uid) => {
        try {
            return await userModel.findOneAndDelete({ _id: uid })
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserManager