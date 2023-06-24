const UserDTO = require('../DTO/UsersDTO')

class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    getUsers = async (query) => {
        try {
            const { docs, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage } = await this.dao.getUsers(query)

            let normalizedUser = []
            for (let user of docs) {
                const { first_name, last_name, email, cartID, age, role, IDUser } = new UserDTO(user.first_name, user.last_name, user.email, user.cartID, user.birthdate, user.role, user._id)
                normalizedUser.push({ first_name, last_name, email, cartID, age, role, IDUser })
            }
            return { normalizedUser, limit, totalPages, page, pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage }
        } catch (error) {
            throw error
        }
    }

    addUser = async (userData) => {
        try {
            const {
                first_name,
                last_name,
                email,
                cartID,
                role,
                birthdate,
                _id
            } = await this.dao.addUser(userData)

            return new UserDTO(first_name, last_name, email, cartID, birthdate, role, _id)
        } catch (error) {
            throw error
        }
    }

    findUser = async (userInfo) => {
        try {
            const user = await this.dao.findUser(userInfo)
            const {
                first_name,
                last_name,
                email,
                cartID,
                age,
                role,
                IDUser
            } = new UserDTO(user.first_name, user.last_name, user.email, user.cartID, user.birthdate, user.role, user._id)
            return { first_name, last_name, email, cartID, age, role, IDUser, password: user.password }
        } catch (error) {
            throw error
        }
    }

    updateUser = async (UID, body) => {
        try {
            const changes = await this.dao.updateUser(UID, body)
            const { first_name, last_name, email, cartID, age, role, IDUser } = new UserDTO(changes.first_name, changes.last_name, changes.email, changes.cartID, changes.birthdate, changes.role, changes._id)
            return { first_name, last_name, email, cartID, age, role, IDUser }
        } catch (error) {
            throw error
        }
    }

    deleteUser = async (uid) => {
        try {
            return this.dao.deleteUser(uid)
        } catch (error) {
            throw error
        }
    }

    changePassword = async ({ email, newPassword }) => {
        try {
            return await this.dao.changePassword({ email, newPassword })
        } catch (error) {
            throw error
        }
    }
}

module.exports = UserRepository