¿Cómo usar?

La base de datos la implemente en un servidor local para poder realizar las pruebas sin necesidad de una acceder a una cuenta o contraseña.
Para empezar a usar las peticiones se puede hacer de 2 formas distintas. En DAO vienen implementadas los managers vía FS y Mongo, el archivo unicamente utiliza mongo aunque FS sigue implementado.

Postman/endpoints:

views:

localhost:8080/home

unicamente muestra los productos que ya están guardados en la base de datos, esta no funciona en tiempo real.

localhost:8080/realtimeproducts

En este endpoint se pueden eliminar y agregar productos en tiempo real, llenando el formulario de arriba para agregar productos y el de abajo para eliminarlos.
El de abajo utiliza las ID de mongo (que vienen en la página para facilidad a la hora de hacer las pruebas). imagen del producto unicamente acepta URL para uso de las imagenes.

localhost:8080/chats

Es un chat en el cual puedes colocar un nombre (el que sea) y poder conversar desde otro cliente contigo mismo (para experimentar la esquizofrenia). La base de datos guarda el nombre con el que te registraste y va agregando en la base de datos los mensajes que hayas escrito.

POST: localhost:8080/carts

Cuando se posiciona en este endpoint genera un cart automaticamente con un ID creado por mongo, cada ves que lanza una peticion de post desde postman.

GET: localhost:8080/carts?cid=iddelcarrito
GET: localhost:8080/carts?limit=numero
GET: localhost:8080/carts

Si se implementa una query mediante get en carts, traerá los carritos según el limite o el ID del carrito que se le otorgue, si no se le otorga un query o el query no coincide con algunos de los dos, por defecto nos traerá todos los carritos

PUT localhost:8080/carts/IDMONGODELCARRITO/product/CLAVEDELPRODUCTO

Revisa si el carrito tiene un producto con el ID generado, si no lo tiene, lo agrega, y en caso de que ya lo tenga, simplemente suma en 1 su valor. De momento no está implementado con los ID products de la base de datos, así que se podría agregar cualquier producto este o no en la base de datos.

DELETE: localhost:8080/carts/IDMONGOCARRITO

Elimina un carrito completo
