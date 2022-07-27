import React from "react";
import styles from './ResetPassword.module.css';
import ReactDOM from 'react-dom';

const ValidatePasswordModal = ({isShowing, hide}) => isShowing ? ReactDOM.createPortal(
        <>
        <div className={styles.title}>Validation</div>
            <div className={styles.form_container}>
                <div className={styles.form_inner}>
                    <form id="validationForm">
                        <div className={styles.field}>
                            <input type="text" id="recovery-code" name="recovery-code" placeholder="Recovery Code" />
                        </div>
                        {/* <div id="emailError" className="error" style={{ display: 'none', textAlign: 'center' }}></div> */}
                        <div className={`${styles.field} ${styles.btn}`}>
                            <div className={styles.btn_layer}></div>
                            <input type="submit" value="Confirm password change" />
                        </div>
                        <div className={`${styles.field} ${styles.btn}`}>
                            <div className={styles.btn_layer}></div>
                            <input type="submit" value="Go back" onClick={hide}/>
                        </div>
                    </form>
                    <form method="post" action="localhost:8080/users">
                    </form>
                </div>
            </div>
        </>, document.body 

    ): null;

export default ValidatePasswordModal;