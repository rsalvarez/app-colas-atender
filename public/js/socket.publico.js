var socket = io();


var lbl1 = $('#lblTicket1');
var lbl2 = $('#lblTicket2');
var lbl3 = $('#lblTicket3');
var lbl4 = $('#lblTicket4');

var lble1 = $('#lblEscritorio1');
var lble2 = $('#lblEscritorio2');
var lble3 = $('#lblEscritorio3');
var lble4 = $('#lblEscritorio4');
var lbltickets = [lbl1, lbl2, lbl3, lbl4];
var lblescritorios = [lble1, lble2, lble3, lble4];

socket.on('estadoActual', function(data) {
    actualizaHtml(data.ultimos4);
})


socket.on('ultimos4', function(data) {
    console.log(data.estado);
    if (!data.estado) {
        let audio = new Audio("audio/new-ticket.mp3");

        let playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise
                .then(_ => {
                    actualizaHtml(data.ultimos4);
                })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    console.log('Error con la reproducción.' + error);
                });
        }

    } else {
        console.log('SIN TOICKET');
    }

})

function actualizaHtml(ultimos4) {
    for (i = 0; i < ultimos4.length; i++) {
        lbltickets[i].text('Ticket ' + ultimos4[i].numero);
        lblescritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}