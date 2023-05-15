console.log('hola')
const registerForm = document.querySelector('#userRegister')

registerForm.addEventListener('submit', e => {
    e.preventDefault()

    const data = new FormData(registerForm)
    const obj = {}
    data.forEach((value, key) => obj[key] = value)

    fetch('/getLoginCookie', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(respuesta => respuesta.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
})

const getCookie = _ => {
    console.log(document.cookie)
}