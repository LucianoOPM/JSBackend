class TicketManager {
    #precioBaseDeGanancia = 0.15
    constructor() {
        this.events = []
    }
    getEvents() {
        return this.events
    }
    addEvent(name, place, price, capacity = 50, date = new Date().toLocaleDateString()) {
        const event = {
            name,
            place,
            price: price + price * this.#precioBaseDeGanancia,
            capacity,
            date,
            participants: []
        }
        if (this.events.length === 0) {
            event.idEvent = 1
        } else {
            event.idEvent = this.events[this.events.length - 1].idEvent + 1
        }
        this.events.push(event)
        return "Evento ingresado correctamente"
    }
    addUser(eventID, idUser) {
        const eventoIndex = this.events.findIndex(e => e.idEvent === eventID);
        if (eventoIndex === -1) {
            return "Evento no encontrado"
        }
        const usuarioRegistrado = this.events[eventoIndex].participants.includes(idUser);
        if (usuarioRegistrado) {
            return "Usuario ya registrado"
        }
        this.events[eventoIndex].participants.push(idUser);
        return "Se ingresó correctamente el usuario"
    }
    putEventOnTour(eventID, newLocate, newDate) {
        const eventoIndex = this.events.findIndex(e => e.idEvent === eventID);
        if (eventoIndex === -1) {
            return "Evento no encontrado"
        }
        const evento = this.events[eventoIndex];
        const newEvento = {
            ...evento,
            lugar: newLocate,
            fecha: newDate,
            idEvent: this.events[this.events.length - 1].idEvent + 1,
            participants: []
        }
        this.events.push(newEvento);
        return "El evento se modificó correctamente"
    }
}

let nuevoTicket = new TicketManager()
nuevoTicket.addEvent("Eslands", "Palacio de los deportes", 1500, 50, "12/12/2023")
nuevoTicket.addEvent("La Velada del año", "España", 2500, 5000, "12/09/2023")
console.log(nuevoTicket.addUser(1, 1))
console.log(nuevoTicket.addUser(1, 2))
console.log(nuevoTicket.addUser(2, 1))
console.log(nuevoTicket.addUser(2, 2))
console.log(nuevoTicket.putEventOnTour(1, 'Mexico', '30/11/2024'))
console.log(nuevoTicket.getEvents());