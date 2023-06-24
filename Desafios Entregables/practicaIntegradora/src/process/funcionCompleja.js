process.on('message', message => {//Cuando detecte un evento recibe el mensaje en el parametro
    console.log(message);
    let result = 0
    for (let i = 0; i < 5e9; i++) {
        result += i
    }
    return process.send(result)//después de ejecutar todo el proceso que tenga que ejecutar, lo mandamos de regreso al proceso principal
})