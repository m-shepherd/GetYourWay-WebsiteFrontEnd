import React from "react";
import styles from './ResetPassword.module.css';
import { useNavigate } from "react-router-dom";
import {createJSONWebToken, passwordChange} from "../LoginAndSignUp/LoginAndSignUpUtils";
import './ResetPassword.css';
import {BACKEND_ADDRESS} from "../configuration";

const ValidatePassword = ({ code, emailAddress }) => {

    let navigate = useNavigate();
    let md5 = require("md5");

    function delay(n){
        return new Promise(function(resolve){
            setTimeout(resolve,n*1000);
        });
    }

    function updatePassword(event) {
        event.preventDefault();

        const recoveryCode = document.getElementById("recovery-code").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        const hashedPassword = md5(password);

        const jsonData = {
            "email": emailAddress,
            "password": hashedPassword
        }

        const token = createJSONWebToken(jsonData);
        const json = JSON.stringify(token);
    

        if((recoveryCode === code) && (password === confirmPassword)){
            const xhr = new XMLHttpRequest();
            xhr.open("PUT", BACKEND_ADDRESS + "/reset", true)
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = async function() {
                if (xhr.readyState === 4)  {
                    const serverResponse = xhr.responseText;
                    console.log(serverResponse)
                    if (serverResponse === '"CREATED"') {
                        const success = document.querySelector("#resetError");
                        success.style.display = "block";
                        success.classList.remove("error");
                        success.classList.add("success");
                        success.innerHTML = "Successfully Reset Password<br></br>Redirecting...";
                        await delay(3);
                        navigate('/');
                    } else {
                        const error = document.querySelector("#resetError");
                        error.style.display = "block";
                        error.innerHTML = "Unable To Reset Password";
                    }
                }
            }
            xhr.send(json);
        } else {
            const error = document.querySelector("#resetError");
            error.style.display = "block";
            if (recoveryCode !== code) {
                error.innerHTML = "Invalid Recovery Code";
            } else {
                error.innerHTML = "Passwords Do Not Match"
            }

        }
    }


    return (
        <form onSubmit={updatePassword}>
            <div id="resetError" className="error" style={{display: 'none', textAlign: 'center'}}></div>
            <div className={styles.field}>
                <input type="text" id="recovery-code" name="recovery-code" placeholder="Recovery Code" />
            </div>
            <div className={styles.field}>
                <input type="password" id="password" name="password" placeholder="New Password"
                    required pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$" onChange={passwordChange} />
            </div>
            <div id="passwordError" className="error" style={{ display: 'none', textAlign: 'center' }}></div>
            <div className={styles.field}>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm New Password"
                    onChange={passwordChange}/>
            </div>
            <div className={`${styles.field} ${styles.btn}`}>
                <div className={styles.btn_layer}></div>
                <input type="submit" value="Confirm Password Change"/>
            </div>
            <div className={styles.pass_link} onClick={() => navigate('/')}><a href="/">Back To Login</a></div>          
        </form>
         );

}

export default ValidatePassword;