import React from 'react'
import styles from "./styles/Popup.module.css"
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

const Popup = (props) => {
    return (props.trigger) ? (
        <div class={styles.login}>
        <div class={styles.logincontainer}>
            <div className={styles.closebtn} onClick={()=> props.closetrigger(false)}><CloseIcon/></div>
            <div class={styles.logintext}>Login Form</div>
            <form action="#">
                <div class={styles.data}>
                    <label for="email">Email or Phone</label>
                    <input type="text" required/>
                </div>
                <div class={styles.data}>
                    <label for="password">Password</label>
                    <input type="text" required/>
                </div>
                <div class={styles.forgotpass}><a href="/">Forgot Password?</a></div>
                <div class={styles.btn}>
                    <div class={styles.inner}></div>
                    <button type="submit">Login</button>
                </div>
                <div class={styles.signuplink}>Not a member? <a href="/register">Signup now</a></div>
            </form>
            </div>
        </div>
    ) : ""
}

export default Popup
