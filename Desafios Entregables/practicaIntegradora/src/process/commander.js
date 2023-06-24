const { Command } = require('commander')//importación
const program = new Command()//instanciación

program//Se utiliza la instancia para configurar las siguientes opciones.
    .option('-d', 'files debug', false)
    .option('-p, --port <port>', 'Server PORT', 8080)
    .option('--mode <mode>', 'Workbench mode', 'production')
    .requiredOption('-u <user>', 'Developer User', 'no declarado')//Para la required option, el 3er argumento es un error en caso de que no se haya pasado un argumento especificado.
    .option('-l, --letters [letters...]', 'specify the letters')
program.parse()//Program parse es el encargado de especificar que guarde las nuevas opciones que ya se declararon.
//option recibe 3 parametros, el primer parametro son los flags, de segundo parametro, recibe una descripcion de la opcion, y de tercer parametro un valor que tendrá por defecto.

//En el CLI pasamos el siguiente comando: node commander.js -d -p 3000 --mode development -u root --letters a b c
//En el CLI pasamos el siguiente comando: node commander.js
//En el CLI pasamos el siguiente comando: node commander.js -d -p 3000 -u root 2 a 5 --letters


//Process también puede manejar eventos, la sintaxis es muy similar a los eventos de socket.io

process.on('exit', params => {
    console.log('Se ejecuta antes de terminar/finalizar el proceso de ejecución.', params);
})
process.on('uncaughtException', exception => {
    console.log('Se ejecuta al encontrar una excepcion', exception);
})
process.on('message', message => {
    console.log('muestra los mensajes de otros procesos.');
})
//console()

