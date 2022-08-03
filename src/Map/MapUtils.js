export function setStart(endMarkerVis) {
    const start = document.querySelector('#start');
    const find = document.querySelector('#find');
    const add = document.querySelector('#add');
    const destination = document.querySelector('#finish');

    start.style.display = 'block';
    if (endMarkerVis) {
        find.style.display = 'block';
        add.style.display = 'block';
        start.classList.remove('single');
        start.classList.add('both');
        destination.classList.remove('single');
        destination.classList.add('both');
    } else {
        start.classList.remove('both');
        start.classList.add('single');
        destination.classList.remove('both');
        destination.classList.add('single');
    }
}

export function setDestination(startMarkerVis) {
    const start = document.querySelector('#start');
    const find = document.querySelector('#find');
    const add = document.querySelector('#add');
    const destination = document.querySelector('#finish');

    destination.style.display = 'block';
    if (startMarkerVis) {
        find.style.display = 'block';
        add.style.display = 'block';
        destination.classList.remove('single');
        destination.classList.add('both');
        start.classList.remove('single');
        start.classList.add('both');
    } else {
        destination.classList.remove('both');
        destination.classList.add('single');
        start.classList.remove('both');
        start.classList.add('single');
    }
}
