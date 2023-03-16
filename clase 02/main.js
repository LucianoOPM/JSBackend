class Contador {//Una clase constructora es una plantilla o molde para crear objetos que define sus propiedades y métodos compartidos. Se utiliza para crear múltiples instancias de objetos con características similares.
    constructor(responsable) {
        this.responsable = responsable
        this.contador = 0
    }

    static contadorGlobal = 0

    getResponsable() {
        return this.responsable
    }
    contar() {
        this.contador++
        Contador.contadorGlobal++
    }
    getCuentaIndividual() {
        return this.contador
    }
    getCuentaGlobal() {
        return Contador.contadorGlobal
    }
}


const cuenta1 = new Contador("Luciano")
const cuenta2 = new Contador("Ana")

cuenta1.contar()
cuenta1.contar()
cuenta1.contar()
cuenta2.contar()
cuenta2.contar()

console.log(cuenta1.getResponsable())
console.log(cuenta2.getResponsable())
console.log(cuenta1.getCuentaIndividual())
console.log(cuenta2.getCuentaIndividual())
console.log(cuenta1.getCuentaGlobal())
