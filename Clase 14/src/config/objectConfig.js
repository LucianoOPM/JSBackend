import { connect } from "mongoose";

const URL = 'mongodb+srv://jesushmail:<password>@cluster0.aw8aaju.mongodb.net/usuarios?retryWrites=true&w=majority'//Cuando en el enlace no se especifica a que colección se está apuntando, se crea una base de datos por defecto llamada "test", si queremos especificar a la base de datos que apuntaremos, colocamos el nombre de la coleccion después de mongodb.net/

export const connectDB = () => {
    console.log('base de datos conectada');
    connect(URL)
}