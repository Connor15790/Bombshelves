import React, { useState } from 'react'
import styles from "./styles/Popup.module.css"
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from "react-router-dom";

const Popup = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authToken);
            alert("Successfully logged in!")
            window.location.reload();
        }
        else {
            alert("Invalid Credentials");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (props.trigger) ? (
        <div className={styles.login}>
            <div className={styles.logincontainer}>
                <div className={styles.closebtn} onClick={() => props.closetrigger(false)}><CloseIcon /></div>
                <div className={styles.logintext}>Login Form</div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.data}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp" placeholder="Enter Email" required />
                    </div>
                    <div className={styles.data}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' value={credentials.password} onChange={onChange} name='password' aria-describedby="passwordHelp" placeholder='Enter Password' required />
                    </div>
                    <div className={styles.forgotpass}><a href="/">Forgot Password?</a></div>
                    <div className={styles.btn}>
                        <div className={styles.inner}></div>
                        <button type="submit">Login</button>
                    </div>
                    <div className={styles.signuplink}>Not a member? <a href="/register">Signup now</a></div>
                </form>
            </div>
        </div>
    ) : ""
}

export default Popup
