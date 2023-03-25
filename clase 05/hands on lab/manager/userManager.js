const fs = require('fs')
const crypto = require('crypto')

const path = "./clase 05/hands on lab/manager/files/users.json"


class UserManager {
    async consultarUser() {
        try {
            if (fs.existsSync(path)) {
                const data = await fs.promises.readFile(path, "utf-8")
                const users = JSON.parse(data)
                return users
            }
            await fs.promises.writeFile(path, "[]", 'utf-8')
            return []
        } catch (error) {
            return `Ah ocurrido un error ${error}`
        }
    }
    async crearUsuario(user) {
        try {
            const users = await this.consultarUser()
            users.length === 0 ? user.id = 1 : user.id = users[users.length - 1].id + 1

            user.salt = crypto.randomBytes(128).toString('base64')
            user.password = crypto.createHmac('sha256', user.salt).update(user.pass).digest('hex')

            users.push(user)
            await fs.promises.writeFile(path, JSON.stringify(users, null, 2), "utf-8");
            return user
        } catch (error) {

        }
    }
    async validarUsuario(nombre, password) {
        try {
            const users = await this.consultarUser()
            const userIndex = users.findIndex(u => u.nombre === nombre)
            if (userIndex === -1) return "Usuario no encontrado"

            const usuario = users[userIndex]
            const newHash = crypto.createHmac('sha256', usuario.salt).update(password).digest('hex')

            if (newHash === usuario.password) {
                return "Loggeado"
            }
            return "Contraseña erronea"
        } catch (error) {
            return `Error: ${error}`
        }
    }
}

module.exports = {
    UserManager
}