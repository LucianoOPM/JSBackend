/*
¿Qué es un proceso?

Cada ves que ejecutamos node app.js o nodemon app.js, estamos corriendo un proceso, este proceso genera un objeto llamado process, la cual contiene información referente a todo lo implicado con el proceso. Tales como:

El uso de la memoria, el ID del proceso del sistema operativo, en que sistema operativo está corriendo, en que entorno está corriendo y que argumentos tiene el entorno.
*/

/* 
console.log(process.cwd());
console.log(process.pid);
console.log(process.memoryUsage());
console.log(process.env);
console.log(process.argv);
console.log(process.version); 
*/
console.log(process.argv.slice(2));//Retorna los argumentos otorgados por la linea de comandos.
/*
TODO lo que venga después de node/nodemon/npm se considera un argumento, por ejemplo, cuando ejecutabamos npm i express, estabamos pasando express como argumento al comando npm.
*/