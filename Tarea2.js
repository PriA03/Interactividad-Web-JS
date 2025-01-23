function addEvents (){

    let add = prompt('Indique la cantidad de eventos desea agregar');

    let eventsList = [];

    let eventName;
    let eventRoom;
    let eventSeats;
    let eventDate;

    for (let i = 0; i<add; i++) {

        eventName = prompt('Indique el nombre del evento');
        eventRoom = parseInt(prompt('Indique el número de sala'), 10);
        eventSeats = parseInt(prompt('Indique la cantidad de espacios disponibles'), 10);
        eventDate = prompt('Indique la fecha y hora del evento. Ejm: 02/02/25 - 5:30 pm');
        
        let eventData = {
            id: i,
            name: eventName,
            room: eventRoom,
            seats: eventSeats,
            date: eventDate
        };

        eventsList.push(eventData);
    }


    return eventsList;
}




function viewEvents(eventsList){

    console.log('Bienvenid@ al Teatro Sueños de Colores ');

    for (let i = 0; i < eventsList.length; i++) {

        let list = eventsList[i];
        console.log(`\nEvento: ${list.name} \nSala: ${list.room} \nAsientos disponibles: ${list.seats} \nFecha: ${list.date}`);
    }
}




let eventsCreated = addEvents();
let allEvents = viewEvents(eventsCreated);












