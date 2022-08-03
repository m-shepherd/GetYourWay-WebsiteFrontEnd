export function confirmFlights() {
    const clickedItems = document.getElementsByClassName('clicked');
    if (clickedItems.length === 1) {
        const flightData = [];
        const childFlightData = [];
        const selectedFlights = clickedItems[0];

        const childRowsName = selectedFlights.rowIndex+ 'child';
        const childRows = document.getElementsByName(childRowsName);

        selectedFlights.childNodes.forEach(
            function(detail) {
                flightData.push(detail.textContent);
            });

        for (let i = 0; i < childRows.length; i++) {
            for (let j = 0; j < childRows[i].childNodes.length; j++) {
                if (childRows[i].children[j].textContent !== '') {
                    childFlightData.push(childRows[i].children[j].textContent)
                }
            }
        }

        const jsonFields = ['departure_airport', 'departure_time', 'arrival_airport',
            'arrival_time', 'price']

        let jsonData = "{";
        for (let i = 0; i <flightData.length - 1; i++) {
            if (i === flightData.length - 2) {
                jsonData += '"' + jsonFields[i] + '": "' + flightData[i + 1] + '"';
            } else {
                jsonData += '"' + jsonFields[i] + '": "' + flightData[i + 1] + '",';
            }
        }
        let legInfo = '['
        for (let i = 0; i < childFlightData.length - 1; i+= 4) {
            let leg = ''
            if (i !== childFlightData.length - 2) {
                for (let j = 0; j < 4; j++) {
                    if (j === 0) {
                        leg += '{"departure": {'
                    }
                    if (j === 2) {
                        leg += '"arrival": {'
                    }
                    if (j === 1) {
                        leg += '"' + jsonFields[j] + '": "' + childFlightData[j + i] + '"'
                        leg += '},'
                    } else if (j === 3) {
                        leg += '"' + jsonFields[j] + '": "' + childFlightData[j + i] + '"'
                        leg += '}}';
                    } else {
                        leg += '"' + jsonFields[j] +'": "' + childFlightData[j + i] + '",'
                    }
                }
                if (i + 4 < childFlightData.length - 1) {
                    legInfo += leg + ','
                } else
                    legInfo += leg
            }
        }
        jsonData += ',"legs":' + legInfo + ']';

        jsonData += '}';

        console.log(JSON.parse(jsonData));
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
                        let isClicked;
                        if (event.target.tagName === "I") {
                            isClicked = event.target.parentElement.parentElement.classList.contains('clicked');
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
                                if (event.target.parentElement.children[0].children[0] !== undefined) {
                                    event.target.parentElement.children[0].children[0].classList.remove('down');
                                }
                                event.target.parentElement.classList.remove('clicked');
                                const name = event.target.parentElement.rowIndex + 'child';
                                const children = document.getElementsByName(name);
                                for (let child in children) {
                                    if (children[child].tagName !== undefined) {
                                        children[child].classList.toggle('show');
                                        children[child].style.display = 'none';
                                    }
                                }
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
                                if (event.target.parentElement.children[0].children[0] !== undefined) {
                                    event.target.parentElement.children[0].children[0].classList.add('down');
                                }
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