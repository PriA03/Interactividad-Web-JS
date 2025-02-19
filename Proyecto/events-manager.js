function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    notification.style.cssText = `
    padding: 15px;
        margin-bottom: 10px;
        border-radius: 4px;
        opacity: 0;
        transform: translateX(100%);
        animation: slideIn 0.5s forwards, fadeOut 0.5s 2.5s forwards;
    `;

    notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            ${message}
        </div>
    `;

    document.getElementById('notification-container').appendChild(notification);


    setTimeout(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, 100);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}


class EventsManager {
    constructor() {
        this.storageKey = 'syncedEvents';
        this.initializeStorage();
        this.setupEventListeners();
    }

    initializeStorage() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
        }
    }

    setupEventListeners() {
        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey) {
                this.notifySubscribers();
            }
        });
    }

    getAllEvents() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    addEvent(event) {
        const events = this.getAllEvents();
        event.id = Date.now(); // Add unique identifier
        events.push(event);
        localStorage.setItem(this.storageKey, JSON.stringify(events));
        this.notifySubscribers();
    }

    updateEvent(id, updatedEvent) {
        const events = this.getAllEvents();
        const index = events.findIndex(e => e.id === id);
        if (index !== -1) {
            events[index] = { ...events[index], ...updatedEvent };
            localStorage.setItem(this.storageKey, JSON.stringify(events));
            this.notifySubscribers();
        }
    }

    deleteEvent(id) {
        const events = this.getAllEvents();
        const filteredEvents = events.filter(e => e.id !== id);
        localStorage.setItem(this.storageKey, JSON.stringify(filteredEvents));
        this.notifySubscribers();
    }

    notifySubscribers() {
        const event = new CustomEvent('eventsUpdated', {
            detail: this.getAllEvents()
        });
        window.dispatchEvent(event);
    }
}

const eventsManager = new EventsManager();

function renderEvent(event, container) {
    const newItem = document.createElement("li");
    newItem.className = "list-group-item";
    newItem.dataset.eventId = event.id;

    const contentDiv = document.createElement("div");
    contentDiv.className = "event-content";
    contentDiv.innerHTML = `
        <strong>${event.name}</strong> <br>
        - Horario: ${event.schedule} <br>
        - Asientos disponibles: ${event.seats} <br><br>
    `;
    newItem.appendChild(contentDiv);

    newItem.addEventListener('mouseover', function () {
        newItem.style.backgroundColor = '#E1D1B2';
        newItem.style.borderRadius = '30px';
        newItem.style.marginRight = '10%';
        newItem.style.transition = 'all 0.3s ease';
        newItem.style.marginLeft = '10%';
    });
    newItem.addEventListener('mouseout', function () {
        newItem.style.backgroundColor = 'transparent';
        newItem.style.marginRight = '0%';
        newItem.style.border = 'none';
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    buttonContainer.style.marginTop = "10px";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Eliminar";
    removeButton.className = "btn";
    removeButton.addEventListener("click", () => {
        eventsManager.deleteEvent(event.id);
        showNotification('Evento eliminado correctamente', 'danger');
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.className = "btn";
    editButton.style.marginRight = "20px";
    editButton.addEventListener("click", () => {
        const isEditing = newItem.getAttribute('data-editing') === 'true';

        if (isEditing) {
            const newEventName = contentDiv.querySelector(".edit-event-name").value;
            const newSchedule = contentDiv.querySelector(".edit-schedule").value;
            const newSeats = contentDiv.querySelector(".edit-seats").value;

            eventsManager.updateEvent(event.id, {
                name: newEventName,
                schedule: newSchedule,
                seats: newSeats
            });

            newItem.setAttribute('data-editing', 'false');
            editButton.textContent = "Editar";
            showNotification('Evento editado correctamente', 'success');
        } else {
            contentDiv.innerHTML = `
                <input type="text" class="edit-event-name form-control" placeholder="Evento" value="${event.name}"> <br>
                - Horario: <input type="text" class="edit-schedule form-control" placeholder="Hora (am/pm) y fecha (dd/mm/aaaa)" value="${event.schedule}"> <br>
                - Asientos disponibles: <input type="number" class="edit-seats form-control" placeholder="Número de asientos" value="${event.seats}"> <br><br>
            `;
            newItem.setAttribute('data-editing', 'true');
            editButton.textContent = "Guardar";
        }
    });

    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(removeButton);
    newItem.appendChild(buttonContainer);

    container.appendChild(newItem);
    const lineBreak = document.createElement("br");
    newItem.after(lineBreak);
}

function updateEventsList() {
    const eventsList = document.getElementById("eventsList");
    if (eventsList) {
        eventsList.innerHTML = '';
        const events = eventsManager.getAllEvents();
        events.forEach(event => renderEvent(event, eventsList));
    }
}

window.addEventListener('eventsUpdated', () => {
    updateEventsList();
});

const events = document.getElementById("addingEvents");
if (events) {
    events.addEventListener("submit", function (event) {
        event.preventDefault();
        const eventName = document.getElementById("eventName").value;
        const schedule = document.getElementById("schedule").value;
        const seats = document.getElementById("seats").value;

        eventsManager.addEvent({
            name: eventName,
            schedule: schedule,
            seats: seats
        });

        showNotification(`Evento "${eventName}" agregado correctamente`);

        document.getElementById("eventName").value = "";
        document.getElementById("schedule").value = "";
        document.getElementById("seats").value = "";
    });
}

updateEventsList();


function renderEvent(event, container, isInteractive) {
    const newItem = document.createElement("li");
    newItem.className = "list-group-item";
    newItem.dataset.eventId = event.id;

    const contentDiv = document.createElement("div");
   
    contentDiv.innerHTML = `
        <strong>${event.name}</strong> <br>
        - Horario: ${event.schedule} <br>
        - Asientos disponibles: ${event.seats} <br><br>
    `;
    newItem.appendChild(contentDiv);

    if (isInteractive) {
       
        newItem.addEventListener('mouseover', function () {
            newItem.style.backgroundColor = '#E1D1B2';
            newItem.style.borderRadius = '30px';
            newItem.style.marginRight = '10%';
            newItem.style.transition = 'all 0.3s ease';
            newItem.style.marginLeft = '10%';
        });
        newItem.addEventListener('mouseout', function () {
            newItem.style.backgroundColor = 'transparent';
            newItem.style.marginRight = '0%';
            newItem.style.border = 'none';
        });

        const buttonContainer = document.createElement("div");
        buttonContainer.className = "button-container";
        buttonContainer.style.marginTop = "10px";

        const removeButton = document.createElement("button");
        removeButton.textContent = "Eliminar";
        removeButton.className = "btn";
        removeButton.addEventListener("click", () => {
            eventsManager.deleteEvent(event.id);
            showNotification('Evento eliminado correctamente', 'danger');
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.className = "btn";
        editButton.style.marginRight = "20px";
        editButton.addEventListener("click", () => {
            const isEditing = newItem.getAttribute('data-editing') === 'true';

            if (isEditing) {
                const newEventName = contentDiv.querySelector(".edit-event-name").value;
                const newSchedule = contentDiv.querySelector(".edit-schedule").value;
                const newSeats = contentDiv.querySelector(".edit-seats").value;

                eventsManager.updateEvent(event.id, {
                    name: newEventName,
                    schedule: newSchedule,
                    seats: newSeats
                });

                newItem.setAttribute('data-editing', 'false');
                editButton.textContent = "Editar";
                showNotification('Evento editado correctamente', 'success');
            } else {
                contentDiv.innerHTML = `
                    <input type="text" class="edit-event-name form-control" placeholder="Evento" value="${event.name}"> <br>
                    - Horario: <input type="text" class="edit-schedule form-control" placeholder="Fecha (dd/mm/aaaa) - Hora (am/pm)" value="${event.schedule}"> <br>
                    - Asientos disponibles: <input type="number" class="edit-seats form-control" placeholder="Número de asientos" value="${event.seats}"> <br><br>
                `;
                newItem.setAttribute('data-editing', 'true');
                editButton.textContent = "Guardar";
            }
        });

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(removeButton);
        newItem.appendChild(buttonContainer);
    }else{
        newItem.style.backgroundColor = "transparent";
        newItem.style.listStyle = "none";
        newItem.style.marginRight = "0%";

    }

    container.appendChild(newItem);
    const lineBreak = document.createElement("br");
    newItem.after(lineBreak);
}


function updateEventsList(isInteractive = true) {
    const eventsList = document.getElementById("eventsList");
    if (eventsList) {
        eventsList.innerHTML = '';
        const events = eventsManager.getAllEvents();
        events.forEach(event => renderEvent(event, eventsList, isInteractive));
    }
}


