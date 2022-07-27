export function usernameChange() {
    const username = document.querySelector("#username")

    const validUsername = username.checkValidity();
    const error = document.querySelector("#usernameError");

    if (username.value.length === 0) {
        error.style.display = "none";
        document.getElementById("username").classList.remove("incorrect");
    } else {

        if (!validUsername && username.value.length > 32) {
            error.style.display = "block";
            error.innerHTML = "Has To Be Shorter Than 32 Characters";
            document.getElementById("username").classList.add("incorrect");
        } else if (!validUsername && username.value.length < 8) {
            error.style.display = "block";
            error.innerHTML = "Has To Be Longer Than 8 Characters";
            document.getElementById("username").classList.add("incorrect");
        } else if (!validUsername) {
            error.style.display = "block";
            if (!username.value.charAt(0).match(/[a-z]/i)) {
                error.innerHTML = "Has To Start With A Letter";
            } else {
                error.innerHTML = "Can Only Contain Letters, Underscores And Dashes";
            }
            document.getElementById("username").classList.add("incorrect");
        } else {
            error.style.display = "none";
            document.getElementById("username").classList.remove("incorrect");
        }
    }

}

export function firstNameChange() {
    const firstName = document.querySelector("#firstName")

    const validFirstName = firstName.checkValidity();
    const error = document.querySelector("#firstNameError")

    if (firstName.value.length === 0) {
        error.style.display = "none";
        document.getElementById("firstName").classList.remove("incorrect");
    } else {

        if (!validFirstName && firstName.value.length > 16) {
            error.style.display = "block";
            error.innerHTML = "Has To Be Shorter Than 16 Characters";
            document.getElementById("firstName").classList.add("incorrect");
        } else if (!validFirstName && firstName.value.length <= 1) {
            error.style.display = "block";
            error.innerHTML = "Has To Be Longer Than 1 Characters";
            document.getElementById("firstName").classList.add("incorrect");
        } else if (!validFirstName) {
            error.style.display = "block";
            error.innerHTML = "Can Only Contain Letters";
            document.getElementById("firstName").classList.add("incorrect");
        } else {
            error.style.display = "none";
            document.getElementById("firstName").classList.remove("incorrect");
        }
    }

}

export function lastNameChange() {
    const lastName = document.querySelector("#lastName")

    const validLastName = lastName.checkValidity();
    const error = document.querySelector("#lastNameError")

    if (lastName.value.length === 0) {
        error.style.display = "none";
        document.getElementById("lastName").classList.remove("incorrect");
    } else {

        if (!validLastName && lastName.value.length >= 15) {
            error.style.display = "block";
            error.innerHTML = "Has To Be Shorter Than 16 Characters";
            document.getElementById("lastName").classList.add("incorrect");
        } else if (!validLastName&& lastName.value.length <= 1) {
            error.style.display = "block";
            error.innerHTML = "Has To Be Longer Than 16 Characters";
            document.getElementById("lastName").classList.add("incorrect");
        } else if (!validLastName) {
            error.style.display = "block";
            error.innerHTML = "Can Only Contain Letters";
            document.getElementById("lastName").classList.add("incorrect");
        } else {
            error.style.display = "none";
            document.getElementById("lastName").classList.remove("incorrect");
        }
    }
}

export function emailChange() {
    const email = document.querySelector("#email")

    const validEmail = email.checkValidity();
    const error = document.querySelector("#emailError")

    if (email.value.length === 0) {
        error.style.display = "none";
        document.getElementById("email").classList.remove("incorrect");
    } else {
        if (!validEmail) {
            error.style.display = "block";
            error.innerHTML = "Must Follow The Format name@address.xyz"
            document.getElementById("email").classList.add("incorrect");
        } else {
            error.style.display = "none";
            document.getElementById("email").classList.remove("incorrect");
        }
    }

}

export function passwordChange() {
    const password = document.querySelector("#password")

    const validPassword = password.checkValidity();
    const error = document.querySelector("#passwordError")

    if (password.value.length === 0) {
        error.style.display = "none";
        document.getElementById("password").classList.remove("incorrect");
    } else {
        if (!validPassword && password.value.length > 32) {
            error.style.display = "block";
            error.innerHTML = "Has To Be Shorter Than 32 Characters";
        } else if (!validPassword && password.value.length < 8) {
            error.style.display = "block";
            error.innerHTML = "Has To Be Longer Than 8 Characters";
        } else if (!validPassword) {
            error.style.display = "block";
            error.innerHTML = "Must Contain At Least 1 Letter And 1 Number"
            document.getElementById("password").classList.add("incorrect");
        } else {
            error.style.display = "none";
            document.getElementById("password").classList.remove("incorrect");
        }
    }

}

export function switchToLogin() {
    const signUpError = document.querySelector("#signUpError");
    signUpError.style.display = 'none';

    const loginText = document.querySelector("#loginText");
    const loginForm = document.querySelector("#loginForm");
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";

    const radio = document.querySelector("#login");
    radio.checked = true;

    const sliderTab = document.querySelector("#sliderTab");
    sliderTab.style.left = "0%";

    const loginLabel = document.querySelector("#loginLabel");
    loginLabel.style.color = "#fff";
    loginLabel.style.cursor = "default";
    loginLabel.style.userSelect = "none";

    const signUpLabel = document.querySelector("#signUpLabel");
    signUpLabel.style.color = "#000";
    signUpLabel.style.cursor = "pointer";
}

export function switchToSignUp() {
    const loginError = document.querySelector("#loginError");
    loginError.style.display = 'none';

    const loginText = document.querySelector("#loginText");
    const loginForm = document.querySelector("#loginForm");
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";

    const radio = document.querySelector("#signup");
    radio.checked = true;

    const sliderTab = document.querySelector("#sliderTab");
    sliderTab.style.left = "50%";

    const signUpLabel = document.querySelector("#signUpLabel");
    signUpLabel.style.color = "#fff";
    signUpLabel.style.cursor = "default";
    signUpLabel.style.userSelect = "none";

    const loginLabel = document.querySelector("#loginLabel");
    loginLabel.style.color = "#000";
    loginLabel.style.cursor = "pointer";
}