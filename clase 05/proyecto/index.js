const moment = require("moment/moment");

let fechaActual = moment()
let miNacimiento = moment("1996-11-05")

if (miNacimiento.isValid()) {
    console.log(fechaActual.diff(miNacimiento, "days"))
}