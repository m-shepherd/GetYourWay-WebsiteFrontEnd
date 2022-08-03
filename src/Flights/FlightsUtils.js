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