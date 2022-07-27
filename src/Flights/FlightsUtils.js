export function getFlights(event) {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/flights?date=2022-07-13&dep=LHR&arr=FRA", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + localStorage.getItem('auth'));
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4)  {
            const serverResponse = xhr.responseText;
            if (serverResponse === '"BAD_REQUEST"') {
                alert('Bad Request');
            } else {
                const flights = JSON.parse(xhr.responseText);
                const flightTable = document.querySelector("#flightTable");
                const flightData = document.querySelector("#flightData");
                const dataTitle = document.querySelector("#dataTitle");
                flightData.style.display = "block";
                dataTitle.style.display = "block";
                for(const flight in flights) {
                    const row = flightTable.insertRow(-1)
                    row.setAttribute('data-href', '#');
                    let i = 0;
                    for (const key in flights[flight]) {
                        if (i !== 0) {
                            const cell = row.insertCell(i - 1);
                            cell.innerHTML = flights[flight][key];
                        }
                        i ++;
                    }
                }
                makeRowsClickable();
            }
        }
    };
    xhr.send();
}

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

function makeRowsClickable() {
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