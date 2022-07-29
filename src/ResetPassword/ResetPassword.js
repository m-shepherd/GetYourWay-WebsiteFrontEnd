import {useNavigate} from "react-router-dom";
import styles from './ResetPassword.module.css';
import './ResetPassword.css'
import {emailChange} from "./ResetPasswordUtils";
import {BACKEND_ADDRESS} from "../configuration";

const ResetPassword = () =>  {

    let navigate = useNavigate();

    function delay(n){
        return new Promise(function(resolve){
            setTimeout(resolve,n*1000);
        });
    }

    function sendEmail(email){
        const emailSettings = {
            "recipient": email,
            "msgBody": BACKEND_ADDRESS + "/users",
            "subject": "Test email"
        }

        const xhr = new XMLHttpRequest();
        xhr.open("POST", BACKEND_ADDRESS + "/email/sendMail", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(emailSettings));
        xhr.onreadystatechange = async function() {
            if (xhr.readyState === 4)  {
                const serverResponse = xhr.responseText;
                if (serverResponse === 'Mail Sent Successfully...') {
                    const success = document.querySelector("#emailError");
                    success.style.display = "block";
                    success.classList.remove("error");
                    success.classList.add("success");
                    success.innerHTML = "Email Successfully Sent<br></br>Redirecting...";

                    await delay(3);
                    switchToValidation();

                } else {
                    const error = document.querySelector("#emailError");
                    error.style.display = "block";
                    error.innerHTML = "Unable To Send Email";
                }
            }
        };

    }

    function checkEmailIsValid(email){
        const xhr = new XMLHttpRequest();
        xhr.open("GET", BACKEND_ADDRESS + "/email/getUserByEmail?email=" + email, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4)  {
                const serverResponse = xhr.responseText;
                if (serverResponse === '"OK"') {
                    sendEmail(email)
                } else {
                    const error = document.querySelector("#emailError");
                    error.style.display = "block";
                    error.innerHTML = "Email Address Not Found";
                }
            }
        };
    }

    function submitEmail(event) {
        event.preventDefault();

        const email = document.querySelector('#email').value;

        checkEmailIsValid(email);
    }

    function switchToValidation() {
        const loginText = document.querySelector("#resetText");
        const loginForm = document.querySelector("#resetForm");
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.title_text}>
                    <div id="resetText" className={styles.title}>Reset Password</div>
                    <div className={styles.title}>Validation</div>
                </div>
                <div className={styles.form_container}>
                    <div className={styles.form_inner}>
                        <form id="resetForm" method="post" onSubmit={submitEmail}>
                            <div className={styles.field}>
                                <input type="text" id="email" name="email" required
                                       pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                                       placeholder="Email Address" maxLength={64} onChange={emailChange}/>
                            </div>
                            <div id="emailError" className="error" style={{display: 'none', textAlign: 'center'}}></div>
                            <div className={`${styles.field} ${styles.btn}`}>
                                <div className={styles.btn_layer}></div>
                                <input type="submit" value="Send Recovery Email"/>
                            </div>
                            <div className={styles.pass_link} onClick={() => navigate('/')}><a href="#">Back To Login</a></div>
                        </form>
                        <form method="post" action="localhost:8080/users">

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;