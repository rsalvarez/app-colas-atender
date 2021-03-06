class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        let data = require('../data/data.json');
        this.tickets = [];
        this.ultimos4 = [];

        if (data.hoy == this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return 'Ticket : ' + this.ultimo;
    }

    getActualState() {
        return 'Ticket : ' + this.ultimo;
    }

    getUltimos4() {
        return this.ultimos4
    }

    atenderTicket(escritorio) {

        if (this.tickets.length == 0) {
            return 'SIN_TK';
        } else {
            let numeroT = this.tickets[0].numero;
            this.tickets.shift();
            let atenderTicket = new Ticket(numeroT, escritorio);
            this.ultimos4.unshift(atenderTicket);
            if (this.ultimos4.length > 4) this.ultimos4.splice(-1, 1);
            this.grabarArchivo();
            return atenderTicket;
        }

    }
    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
    }

    grabarArchivo() {
        let jsonData = { ultimo: this.ultimo, hoy: this.hoy, tickets: this.tickets, ultimos4: this.ultimos4 };
        let jsonDataString = JSON.stringify(jsonData);
        const fs = require('fs');
        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }
}


module.exports = { TicketControl }