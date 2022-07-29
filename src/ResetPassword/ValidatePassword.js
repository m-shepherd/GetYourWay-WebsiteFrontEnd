import React from "react";
import styles from './ResetPassword.module.css';
import ReactDOM from 'react-dom';
import { useNavigate } from "react-router-dom";
import { passwordChange } from "../LoginAndSignUp/LoginAndSignUpUtils";

const ValidatePassword = ({ code, emailAddress }) => {

    let navigate = useNavigate();

    function updatePassword() {

        const recoveryCode = document.getElementById("recovery-code").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if((recoveryCode == code) && (password == confirmPassword)){
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", "http://localhost:8080/users/updatePassword/" + emailAddress + "/" + password, true)
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4)  {
                    const serverResponse = xhr.responseText;
                    if (serverResponse === '"OK"') {
                        console.log("Password Successfully changed");
                    } else {
                        console.log("Error")
                    }
                }
            };
        }
    }


    return (
        <form onSubmit={updatePassword}>
            <div className={styles.field}>
                <input type="text" id="recovery-code" name="recovery-code" placeholder="Recovery Code" />
            </div>
            <div className={styles.field}>
                <input type="text" id="password" name="password" placeholder="New Password"
                    required pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$" onChange={passwordChange} />
            </div>
            <div id="passwordError" className={styles.error} style={{ display: 'none', textAlign: 'center' }}></div>
            <div className={styles.field}>
                <input type="text" id="confirm-password" name="confirm-password" placeholder="Confirm New Password"
                    onChange={passwordChange}/>
            </div>
            <div className={`${styles.field} ${styles.btn}`}>
                <div className={styles.btn_layer}></div>
                <input type="submit" value="Confirm password change"/>
            </div>
            <div className={styles.pass_link} onClick={() => navigate('/')}><a href="/">Back To Login</a></div>          
        </form>
         );

}

export default ValidatePassword;