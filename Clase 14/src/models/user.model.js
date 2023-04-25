///schema para estandarizar un prototipo de objeto para ingresar a la base de datos.

//1ero se importa mongoose
//import mongoose from "mongoose";

//Despues creamos una nueva instancia sobre moongose el cual nos permite crear una configuración para estandarizar sobre la base de datos.
// const userSchema = new mongoose.Schema({

// })
//Esto se puede desestructurizar para poder implementarlo de otra manera.

import { Schema, model } from "mongoose";
//Aqui estamos importando los métodos Schema y model directamente desde mongoose para poder utilizarlos.

const collection = 'usuarios'
//Esta variable será la colección a la cual se dirigirá la configuración dentro de la base de datos.

//Y después instanciamos el objeto de configuración que queremos que tenga nuestra colección dentro de la base de datos.

const userSchema = new Schema({
    first_name: String,//Si el tipo de dato no tiene una configuración compleja por dentro, simplemente definimos el tipo de dato que utilizará.
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }//Si requerimos configuraciones más complejas para el campo del objeto, abrimos llaves de un objeto de configuración y dentro le colocamos la configuración que tendrá.
    //Required es que si o si es requerido o sea no puede ser nulo, type es el tipo de dato que será, puede ser string, boolean, number, etc, y unique es que el campo no se puede repetir con otro documento dentro de la colección.
})

const userModel = model(collection, userSchema)
//userModel guarda el modelo del schema que se utilizará y dentro de que schema utilizará dicha configuración, este será lo que se exportará para poder utilizar toda la configuración dentro de otros archivos JS en los que sea necesario utilizarlo. Y este será el que se utilizará para hacer los updates, deletes, insert y create de la base de datos.

export default userModel
//Y se exporta.