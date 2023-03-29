const { ProductManager } = require("./proManJSON")

const producto = new ProductManager("./managerData/data.json")
/* const path = "X:/Coderhouse backend/Desafios Entregables/Product Manager JSON/data.json" */

let pruebas = async () => {
    console.log(await producto.addProduct("Ryzen 5 3600", "Procesador AMD Ryzen 5 3600", 2500, "Sin imagen", "RYZ-5-3600", 15))
    console.log(await producto.addProduct("NVIDIA 1660s", "Tarjeta de vídeo NVIDIA MSI", 4500, "Sin imagen", "MSI-NVI-1660s", 99))
    console.log(await producto.addProduct("Seagate 1TB", "Disco duro de 1TB", 500, "Sin imagen", "SEA-1-TB", 50))
    console.log(await producto.addProduct("Radeon RX 6500", "Tarjeta de vídeo AMD RX 6500", 3500, "Sin imagen", "RADEON-RX-6500-XT-MECH-2X", 15))
    console.log(await producto.addProduct("Intel Core i5-11400", "Procesador Intel Core i5-11400", 2899, "Sin imagen", "BX8070811400", 60))
    console.log(await producto.addProduct("SSD Team Group", "SSD Team Group GX2 1TB", 909, "Sin imagen", "T253X2001T0C101", 12))
    console.log(await producto.addProduct("ASUS ROG Strix Helios", "Gabinete ASUS ROG Strix con ventana RGB", 6139, "Sin imagen", "90DC0020-B30000", 23))
    console.log(await producto.addProduct("EVGA 700 GB 80 PLUS", "Fuente de poder EVGA 80W", 1859, "Sin imagen", "100-GD-0700-V1", 100))
    console.log(await producto.addProduct("Memoria RAM G.Skill", "KIT DDR4 3000mhz 16gb (2 x 8gb)", 1469, "Sin imagen", "F4-3000C16D-16GTZR", 1))
    console.log(await producto.addProduct("ASUS ATX PRIME B560-PLUS", "Tarjeta Madre ATX Prime B560-PLUS", 1899, "Sin imagen", "PRIME B560-PLUS", 72))
}
pruebas()