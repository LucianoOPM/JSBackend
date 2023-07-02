const btton = document.querySelector('#restoreButton')
const resForm = document.querySelector('#restoreForm')

const restorePassword = evt => {
    evt.preventDefault()

    const data = new FormData(resForm)
    const obj = {}

    data.forEach((value, key) => obj[key] = value)

    fetch('/api/users/restore', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))

    resForm.reset()
}

btton.addEventListener('click', restorePassword)