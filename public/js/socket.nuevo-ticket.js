var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', function() {
    console.log('Conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('Desconectado del server');
})



// escuchar info



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
})