const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');
const ticketControl = require('../classes/ticket-control');

const tc = new TicketControl();
console.log(tc);

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('estadoActual', {
        ini: tc.getActualState(),
        ultimos4: tc.getUltimos4()
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        let sig = tc.siguiente();
        callback(sig);

    });

    client.on('atenderTicket', (data, callback) => {
        //console.log(data);
        if (!data.escritorio) {
            return callback({ err: true, message: 'El escritorio es obligatorio' });
        }
        let atender = tc.atenderTicket(data.escritorio);

        callback(atender);
        console.log(atender);
        client.broadcast.emit('ultimos4', {
            ultimos4: tc.getUltimos4(),
            estado: atender === 'SIN_TK'
        })




    });



});