let ejemplo = [
    {
        id: 1,
        name: "Hu Tao",
        elemento: "Pyro",
        nacion: "Liyue"
    },
    {
        id: 2,
        name: "Ayaka",
        elemento: "Cryo",
        nacion: "Inazuma"
    },
    {
        id: 3,
        name: "Zhongli",
        elemento: "Geo",
        nacion: "Liyue"
    }
]

let cambiar = (idProducto, cambio) => {
    let busquedaProducto = ejemplo.find((id) => id.id === idProducto)
    if (!busquedaProducto) return `No se encontró elemento con el ID: ${idProducto}`
    let guardarID = idProducto
    Object.assign(busquedaProducto, cambio)
    busquedaProducto.id = guardarID
    return `Se efectuó el cambio al objeto con el ID: ${idProducto}`
}
cambiar(1, { id: 9, name: "Barbara", elemento: "Hydro", nacion: "Mondstat" })
console.log(ejemplo);