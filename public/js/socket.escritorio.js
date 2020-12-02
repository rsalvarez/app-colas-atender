var socket = io();

/*
socket.on('connect', function() {
    console.log('Conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('Desconectado del server');
})
*/


let params = (new URL(document.location)).searchParams;

if (!params.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
var escritorio = params.get('escritorio');
var small = $('small');

$('h1').text('Escritorio ' + escritorio);


$('button').on('click', function() {
    const message = 'atenderTicket';
    socket.emit(message, { escritorio: escritorio }, function(ticketPendiente) {
        console.log(ticketPendiente);
        let mensaje = '';
        if (ticketPendiente === 'SIN_TK') {
            small.text('Sin ticket para atender');
            return;
        }
        small.text('Ticket ' + ticketPendiente.numero);

    });

})




// escuchar info


/*
$('button').on('click', function() {
    const message = 'siguienteTicket';
    socket.emit(message, null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });

})

$(document).ready(function() {
    socket.on('estadoActual', function(data) {
        label.text(data.ini);
    });
})*/