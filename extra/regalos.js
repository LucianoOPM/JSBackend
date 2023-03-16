const gifts = ['cat', 'game', 'socks']

function warpping(gifts) {
    let regalosEnvueltos = []

    for (let regalo of gifts) {
        let papelRegalo = "*".repeat(2 + regalo.length)

        regalosEnvueltos.push(`${papelRegalo}\n*${regalo}*\n${papelRegalo}`)
    }

    return regalosEnvueltos
}

const warpped = warpping(gifts)

console.log(warpped)