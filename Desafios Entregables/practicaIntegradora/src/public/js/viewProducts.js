let login = document.querySelector('#formLogin')

login.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = new FormData(login)
    const obj = {}
    data.forEach((key, value) => obj[key] = value);

    fetch('/api/session/login', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
            //'authorization': 'Bearer token'//al hacer peticiones,en token iría todo el token que recibimos en el localstorage.
        },
        body: JSON.stringify(obj)
    })
        .then(respuesta => respuesta.json())
        .then(respuesta => localStorage.setItem('token', respuesta.payload))
        .catch(error => console.log(error))
})


/* const formProduct = document.querySelector('#newProduct')
const addButton = document.querySelector("#addButton")


addButton.addEventListener('click', (e) => {
    e.preventDefault()

    const data = addButton.value

    fetch('/api/carts')
}) */