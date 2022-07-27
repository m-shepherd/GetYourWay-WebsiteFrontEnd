export function emailChange() {
    const email = document.querySelector("#email");

    const validEmail = email.checkValidity();
    const error = document.querySelector("#emailError");

    if (email.value.length === 0) {
        error.style.display = "none";
        document.getElementById("email").classList.remove("incorrect");
    } else {
        if (!validEmail) {
            error.style.display = "block";
            error.innerHTML = "Email Must Follow The Format name@address.xyz"
            document.getElementById("email").classList.add("incorrect");
        } else {
            error.style.display = "none";
            document.getElementById("email").classList.remove("incorrect");
        }
    }

}