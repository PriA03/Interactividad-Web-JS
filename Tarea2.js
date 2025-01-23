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

    for (let i = 0; i < eventsList.length; i++) {

        let list = eventsList[i];

        console.log(`Bienvenid@ al Teatro Sueños de Colores \n\nEvento: ${list.name} \nSala: ${list.room} \nAsientos disponibles: ${list.seats} \nFecha: ${list.date}`);
    }
}


function buyTickets(eventsList, eventDesired){

    let found = false;
    const attemptsAccepted = 3;
    const attemptsFailed = 0;

    for (let i = 0; i < eventsList.length; i++) {

    if (eventsList[i] === eventDesired) {

        found = true;

    }else {

        eventDesired = prompt('El evento no existe, vuelva a ingresar el nombre del evento, por favor');

        if (attemptsFailed === attemptsAccepted){
            console.log('Lo sentimos, ha escrito de manera erronea el evento demasiadas veces. Por favor inténtelo más tarde');
            break;
        }

    }

    }

    if (found != false){

        let seatsRequired = parseInt(prompt('Indique cuántos asientos desea comprar'), 10);

        for (let i = 0; i < eventsList.length; i++) {

            if (eventsList[i] === eventDesired) {

                eventList.seats = eventList.seats - seatsRequired;
                break;
        
            }
        }

    }

    return eventList;

}


let eventsCreated = addEvents();
let allEvents = viewEvents(eventsCreated);




let buy = prompt('Desea comprar tiquetes?. Ingrese: 1 (Sí) o 2 (No)');

switch (buy){

    case 1: 
    
    allEvents;
    let eventDesired = prompt('Indique el nombre del evento al que desea asistir. Debe escribirlo tal y como se mostraba en la lista');
    let reloadEvents = buyTickets(eventDesired, allEvents);

    case 2: 
    
    console.log('Muchas gracias por visitarnos!');
    break;

    default:
    console.log('Has elegido una opción no existente');

}







