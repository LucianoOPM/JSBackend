/*Crypto*/
/*Crypto (aunque no lo usaremos) Es un libreria ya incluido en NodeJS, sirve para encriptar string en diferentes tipos de encodificación, fue tomado muy por encima ya que esta libreria no se usará para validar datos y usuarios*/

/*NPM*/

/*Node Package Manager(NPM)Es un manejador de paquetes que permite a los desarrolladores crear sus propios modulos subirlos a la nube y que otros desarrolladores los instalen directamente desde la consola. Para saber como instalar los modulos que necesitaremos, tenemos que ir a la web de NPM, buscar el modulo que necesitamos y leer la documentación para ver la instalación del paquete. La web es: https://www.npmjs.com/*/

/*Package.json*/

/*Package.json es un archivo que generamos dentro de nuestros proyectos el cual contendrá un resumen del mismo. Se podrá visualizar
1.-El nombre del proyecto
2.-La versión del proyecto
3.-Algunos scripts para correr el proyecto.
4.-dependencias para el funcionamiento del proyecto.
*/

/*Dependencias*/

/*Cuando el proyecto necesite utilizar los paquetes de terceros alojados en NPM, se añadirá un nuevo campo a nuestro packge.json llamado "dependencies", el cual contendrá los modulos que tenemos instalados en el proyecto y por lo tanto, que necesitará esas dependencias para el correcto funcionamiento del proyecto.*/

/*Instalaciones globales y locales.*/

/*Instalar una dependencia de manera local hace referencia a que esa dependencia unicamente trabaja dentro de ese programa, o sea, si quisiera utilizar ese paquete de información dentro de otro archivo JS, no podría trabajar correctamente, ya que no funciona de manera global, solo de manera local. Por otro lado, los modulos globales, funcionan para todos los proyectos. Evitando que tengamos que instalar el mismo modulo para todos los proyectos. Para instalar de manera global, solo colocamos la flag -g. Ejemplo: npm install -g modulo_a_instalar*/

/*Lo malo de las instalaciones globales.*/

/*Si instalamos una dependencia global estamos limitando a que nuestros proyectos trabajen con la versión de la dependencia global. Esto quiere decir que si nuestro paquete tiene la version de actualización 1.0.0, TODOS los trabajos deberán realizarse con esa version. Pero que pasa si quiero hacer un trabajo con la versión 2.0.0? Al actualizar la version del paquete global, puede que nuestros trabajos realizados con la version 1.0.0 se rompan al actualizar la version 2.0.0, esto implicaría tener que actualizar todos los trabajos, lo cual puede llegar a ser un poco molesto.*/

/*Versionado de dependencias*/

/*Cómo cualquier otro programa este no suele quedarse en solo una versión, si no que se irá actualizando, lo mismo pasa con todas las dependencias de terceros, están regidas por versiones. Una versión define puntos especificos en los que un código tiene ciertas caracteristicas, sintaxis, funcionalidades e incluso errores*/

/*Semantica de versionado*/

/*Las versiones se basan en 3 elementos básicos.

                    v2.0.4

El primer dígito hace referencias a grandes cambios, tanto que ya no son compatibles con versiones más antiguas
El segundo dígito hace referencia a cambios no tan grandes, que permiten el funcionamiento normal de los proyectos sin afectarlos
El tercer digito, son simplemente arreglos de bugs o manejo de defectos, no está cambiando nada, estructuralmente hablando, sólo arreglando cosas.
*/

/*Operadores de actualización*/

/*En nuestro package.json tenemos varios iconos en las versiones de nuestras dependencias. También los podemos colocar nosotros si así lo deseamos. Y tienen distintos significados:
"^".- Sirve para instalar la versión menor más actual. O sea que si tenemos un archivo 1.19.2 lo actualizará a la 1.20.2
"~".- Es el operador de los parches, instala solamente los arreglos de reparacion de errores, es decir, si hay una version 1.20.2, instalará la siguiente version 1.20.3 pero no instalará la 1.21.2
Si en la version del programa no tiene nigun operador, no actualizará a ninguna version
*/

/*Comandos para actualizar*/

/*Con "npm outdated" podemos comprobar las dependencias y nos informará cual es la versión que tenemos actualmente instalada y nos señalará si hay alguna actualización en caso de que querramos instalar alguna actualización de las dependencias.*/

/*Si queremos realizar una actualización de las dependencias que nos recomendó npm, simplemente colocamos la sentencia "npm update" y nos actualizará las dependencias*/