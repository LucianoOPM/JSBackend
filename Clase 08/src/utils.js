/*AQUI ES DÓNDE SE CONFIGURA EL MULTER PARA PODER EXPORTARLO.*/

const multer = require('multer')//se importa
const storage = multer.diskStorage({
    /*El diskstorage seleccionamos DÓNDE se guardaran los objetos a guardar con el nombre. Este método tiene dos propiedades:*/

    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/uploads`)
    },
    filename: (req, file, cb) => {
        console.log('file: ', file)
        cb(null, `${Date.now()}-${file.originalname}`)
    }

})//Objeto de CONFIGURACIÓN del multer

const uploader = multer({
    storage,
    onError: (err, next) => {
        console.log(err)
        next()
    }
})//Dónde se almacena el storage ya configurado

module.exports = {
    uploader
}//Exportación de la variable configurada.