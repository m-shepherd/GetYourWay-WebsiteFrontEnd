export function confirmFlights() {
    const clickedItems = document.getElementsByClassName('clicked');
    if (clickedItems.length === 1) {
        const flightData = [];
        const selectedFlights = clickedItems[0];
        selectedFlights.childNodes.forEach(
            function(detail) {
                flightData.push(detail.textContent);
            });
        const jsonFields = ['departure_airport', 'departure_time', 'arrival_airport',
            'arrival_time', 'airline_name', 'flight_number']

        let jsonData = "{";
        for (let i = 0; i <flightData.length; i++) {
            if (i === flightData.length - 1) {
                jsonData += '"' + jsonFields[i] + '": "' + flightData[i] + '"';
            } else {
                jsonData += '"' + jsonFields[i] + '": "' + flightData[i] + '",';
            }
        }
        jsonData += '}';

        console.log(JSON.stringify(jsonData));
    }
}

export function makeRowsClickable() {
    const table = document.getElementById("table");
    const rows = table.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        const currentRow = table.rows[i];
        const createClickHandler = function() {
            return function(event) {
                const isClicked = event.target.parentElement.classList.contains('clicked');
                const clickedItems = document.getElementsByClassName('clicked');
                for (let i = 0; i < clickedItems.length; i++) {
                    clickedItems[i].classList.remove('clicked');
                }
                if (isClicked) {
                    event.target.parentElement.classList.remove('clicked');
                } else {
                    event.target.parentElement.classList.toggle('clicked');
                }
                showConfirmButton();
            };
        };
        currentRow.onclick = createClickHandler();
    }
}

function showConfirmButton() {
    let clicked = false;
    const clickedItems = document.getElementsByClassName('clicked');
    for (let i = 0; i < clickedItems.length; i++) {
        if (clickedItems[i].classList.contains('clicked')) {
            clicked = true;
        }
    }
    const destination = document.querySelector("#destination");
    if (clicked) {

        destination.style.display = "block";
    } else {
        destination.style.display = "none";
    }
}