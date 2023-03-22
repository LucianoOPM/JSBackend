class Calculadora {
    suma(a, b) {
        return a + b
    }
    resta(a, b) {
        return a - b
    }
}
//Esto
module.exports = {
    Calculadora
}
//Es lo mismo que esto: 
//export default Calculadora
//Y esto
//module.exports = Calculadora