import {useNavigate} from "react-router-dom";
import styles from './LoginInAndSignUp.module.css';
import './LoginAndSignUp.css';
import {
    emailChange,
    firstNameChange,
    lastNameChange,
    passwordChange,
    switchToLogin,
    switchToSignUp,
    usernameChange
} from './LoginAndSignUpUtils';

const LoginAndSignUp = () => {

    let navigate = useNavigate();
    let md5 = require('md5');

    function loginSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const object = {};
        data.forEach((value, key) => object[key] = value);
        object.firstName = "Placeholder"; object.lastName = "Placeholder"; object.email = "Placeholder";
        object.role = "Placeholder";
        object.password = md5(object.password);
        const json = JSON.stringify(object);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/login", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4)  {
                const serverResponse = xhr.responseText;
                const loginError = document.querySelector("#loginError");
                if (serverResponse === '"OK"') {
                    loginError.style.display = 'none';
                    localStorage.setItem('auth', btoa( object.username + ":" + object.password));
                    navigate('/MainPage');
                } else {
                    loginError.style.display = "block";
                    loginError.innerHTML = "Invalid Login Details";
                }
            }
        };
        xhr.send(json);
    }

    function signUpSubmit(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        const object = {};
        data.forEach((value, key) => object[key] = value);
        object.role = 'USER';
        object.password = md5(object.password);
        const json = JSON.stringify(object);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/signUp", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                const serverResponse = xhr.responseText;
                const signUpError = document.querySelector("#signUpError");
                if (serverResponse === '"CREATED"') {
                    localStorage.setItem('auth', btoa( object.username + ":" + object.password))
                    navigate('/MainPage')
                } else {
                    signUpError.style.display = "block";
                    signUpError.innerHTML = "Invalid Details";
                }
            }
        };
        xhr.send(json);
    }

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.title_text}>
                    <div id="loginText" className={styles.title}>Login Form</div>
                    <div className={`${styles.title} ${styles.signup}`}>Sign Up Form</div>
                </div>
                <div className={styles.form_container}>
                    <div className={styles.slide_controls}>
                        <input type="radio" name="slide" id="login" checked onChange={switchToSignUp}/>
                        <input type="radio" name="slide" id="signup" onChange={switchToLogin}/>
                        <label id="loginLabel" htmlFor="login" className={styles.slide}
                               onClick={switchToLogin} style={{cursor: "default"}}>Login</label>
                        <label id="signUpLabel" htmlFor="signup" className={`${styles.slide} ${styles.signup}`}
                               onClick={switchToSignUp}>Sign Up</label>
                        <div id="sliderTab" className={styles.slider_tab}></div>
                    </div>
                    <div id="loginError" className={styles.error} style={{display: "none"}}></div>
                    <div className={styles.form_inner}>
                        <form id="loginForm" onSubmit={loginSubmit} method="post" action="localhost:8080/users">
                            <div className={styles.field}>
                                <input type="text" name="username" placeholder="Username" required/>
                            </div>
                            <div className={styles.field}>
                                <input type="password" name="password" placeholder="Password" required/>
                            </div>
                            <div className={styles.pass_link} onClick={() => navigate('/ResetPassword')}><a href="#">Forgot Password?</a></div>
                            <div className={`${styles.field} ${styles.btn}`}>
                                <div className={styles.btn_layer}></div>
                                <input type="submit" value="Login"/>
                            </div>

                            <div className={styles.signup_link}>Not A Member? <a href="#" onClick={switchToSignUp}>Sign Up Now</a></div>
                        </form>
                        <form className={styles.signup} onSubmit={signUpSubmit} method="post" action="localhost:8080/users">
                            <div id="signUpError" className={styles.error} style={{display: "none"}}></div>
                            <div className={styles.field}>
                                <input type="text" id="username" name="username" required
                                       pattern="^[A-Za-z][A-Za-z0-9_-]{7,31}$" placeholder="Username"
                                       onChange={usernameChange}/>
                            </div>
                            <div id="usernameError" className={styles.error} style={{display: 'none', textAlign: 'center'}}></div>

                            <div className={styles.field}>
                                <input type="text" id="firstName" name="firstName" required pattern="[a-zA-Z]{1,16}$"
                                       placeholder="First Name" onChange={firstNameChange}/>
                            </div>
                            <div id="firstNameError" className={styles.error} style={{display: 'none', textAlign: 'center'}}></div>

                            <div className={styles.field}>
                                <input type="text" id="lastName" name="lastName" required pattern="[a-zA-Z]{1,16}$"
                                       placeholder="Last Name" onChange={lastNameChange}/>
                            </div>
                            <div id="lastNameError" className={styles.error} style={{display: 'none', textAlign: 'center'}}></div>
                            <div className={styles.field}>
                                <input type="text" id="email" name="email" required
                                       pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
                                       placeholder="Email Address" maxLength={64} onChange={emailChange}/>
                            </div>
                            <div id="emailError" className={styles.error} style={{display: 'none', textAlign: 'center'}}></div>
                            <div className={styles.field}>
                                <input type="password" id="password" name="password" placeholder="Password" required
                                       pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$" onChange={passwordChange}/>
                            </div>
                            <div id="passwordError" className={styles.error} style={{display: 'none', textAlign: 'center'}}></div>
                            <div className={`${styles.field} ${styles.btn}`}>
                                <div className={styles.btn_layer}></div>
                                <input type="submit" value="Sign Up"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginAndSignUp;