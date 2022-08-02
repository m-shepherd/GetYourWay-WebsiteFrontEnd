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
        if (table.rows[i] != null) {
            if (!table.rows[i].classList.contains('childTableRow')) {
                const currentRow = table.rows[i];
                const createClickHandler = function () {
                    return function (event) {
                        console.log(event.target)
                        let isClicked;
                        if (event.target.tagName === "I") {
                            isClicked = event.target.parentElement.parentElement.classList.contains('clicked');
                        } else if (event.target.tagName === "P") {
                            isClicked = event.target.parentElement.parentElement.parentElement.classList.contains('clicked');
                        } else {
                            isClicked = event.target.parentElement.classList.contains('clicked');
                        }

                        const clickedItems = document.getElementsByClassName('clicked');
                        for (let i = 0; i < clickedItems.length; i++) {
                            clickedItems[i].classList.remove('clicked');
                        }

                        const expandedItems = document.getElementsByClassName('expanded');
                        for (let i = 0; i < expandedItems.length; i++) {
                            expandedItems[i].classList.add('standard');
                            expandedItems[i].classList.remove('expanded');
                        }
                        const downItems = document.getElementsByClassName('down');
                        for (let i = 0; i < downItems.length; i++) {
                            downItems[i].classList.remove('down');
                        }

                        if (isClicked) {
                            if (event.target.tagName === "I") {
                                table.rows[event.target.parentElement.parentElement.rowIndex + 1].style.display = "none";
                                event.target.classList.remove('down');
                                event.target.parentElement.parentElement.classList.remove('clicked');
                                const name = event.target.parentElement.parentElement.rowIndex + 'child';
                                const children = document.getElementsByName(name);
                                for (let child in children) {
                                    if (children[child].tagName !== undefined) {
                                        children[child].classList.toggle('show');
                                        children[child].style.display = 'none';
                                    }
                                }
                            } else {
                                event.target.parentElement.classList.remove('clicked');
                                const name = event.target.parentElement.rowIndex + 'child';
                                const children = document.getElementsByName(name);
                                for (let child in children) {
                                    if (children[child].tagName !== undefined) {
                                        children[child].classList.toggle('show');
                                        children[child].style.display = 'none';
                                    }
                                }
                                event.target.parentElement.children[0].children[0].classList.remove('down');
                            }
                        } else {
                            if (event.target.tagName === "I") {
                                event.target.classList.add('down');
                                event.target.parentElement.parentElement.classList.add('clicked');
                                const name = event.target.parentElement.parentElement.rowIndex + 'child';
                                const children = document.getElementsByName(name);
                                for (let child in children) {
                                    if (children[child].tagName !== undefined) {
                                        children[child].classList.toggle('show');
                                        children[child].style.display = 'table-row';
                                    }
                                }
                            } else {
                                event.target.parentElement.children[0].children[0].classList.add('down');
                                event.target.parentElement.classList.add('clicked');
                                const name = event.target.parentElement.rowIndex + 'child';
                                const children = document.getElementsByName(name);
                                for (let child in children) {
                                    if (children[child].tagName !== undefined) {
                                        children[child].classList.toggle('show');
                                        children[child].style.display = 'table-row';
                                    }
                                }
                            }
                        }
                        showConfirmButton();
                    }
                }
                currentRow.onclick = createClickHandler();
            }
        }
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