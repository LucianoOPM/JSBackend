const { UserManager } = require("./userManager");

const Manager = new UserManager()

const env = async () => {
    // let primeraConsultaDeUsuarios = await Manager.consultarUser()
    // console.log(primeraConsultaDeUsuarios)

    let user = {
        nombre: "MrCaraTortilla",
        apellido: "Perez",
        edad: 26,
        curso: "Backend",
        pass: "123"
    }

    // let result = await Manager.crearUsuario(user)
    // console.log(result)

    // let segundaConsultaDeUsuarios = await Manager.consultarUser()
    // console.log(segundaConsultaDeUsuarios)

    console.log(await Manager.validarUsuario("MrCaraTortilla", "123"))
}
env()