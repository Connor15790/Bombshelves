import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Register.module.css";
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const REGISTER_URL = "/register";

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();
    let navigate = useNavigate();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [number, setNumber] = useState("");
    const [validNumber, setValidNumber] = useState(false);
    const [numberFocus, setNumberFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [err, setErr] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email + "com");
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErr("");
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: user, number: number, email: email, password: pwd })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authToken);
            navigate("/")
            // props.showAlert("Account Created Successfully", "success");
        }
        // else {
        //     // props.showAlert("Invalid Credentials", "danger");
        // }
    }

    console.log(validName, validPwd, validMatch);

    return (
        <>
            {success ? (
                <div className={styles.success}>
                    <div className={styles.successtext}>Success!</div>
                    <p className={styles.signin}><a href="/">Sign In</a></p>
                </div>
            ) : (
                <div className={styles.register}>
                    <p>BombShelves.com</p>
                    <div className={styles.regcontainer}>
                        <div className={styles.regtext}>Register</div>
                        <form>
                            <div className={styles.data1}>
                                <label htmlFor="username">Name:</label>
                                <input
                                    type="text"
                                    required
                                    id='username'
                                    autoComplete='off'
                                    onChange={(e) => setUser(e.target.value)}
                                    aria-invalid={validName ? "false" : "true"}
                                    // aria-aria-describedby='uidnote'
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <p id='uidnote' className={userFocus && user && !validName ? styles.instructions : styles.offscreen}>
                                    - 4 to 24 characters.<br />
                                    - Must begin with a letter.<br />
                                    - Letters, numbers, underscores, hyphens allowed.
                                </p>
                            </div>
                            <div className={styles.data1}>
                                <label htmlFor="username">Number:</label>
                                <input
                                    type="number"
                                    required
                                    id='number'
                                    autoComplete='off'
                                    onChange={(e) => setNumber(e.target.value)}
                                    aria-invalid={validNumber ? "false" : "true"}
                                    // aria-aria-describedby='uidnote'
                                    // onFocus={() => setNumberFocus(true)}
                                    onBlur={() => setNumberFocus(false)}
                                />
                                {/* <p id='uidnote' className={numberFocus && number && !validNumber ? styles.instructions : styles.offscreen}>
                                    - 4 to 24 characters.<br />
                                    - Must begin with a letter.<br />
                                    - Letters, numbers, underscores, hyphens allowed.
                                </p> */}
                            </div>
                            <div className={styles.data1}>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    required
                                    id='email'
                                    ref={userRef}
                                    autoComplete='off'
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-invalid={validEmail ? "false" : "true"}
                                    // aria-aria-describedby='uidnote'
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <p id='uidnote' className={emailFocus && email && !validEmail ? styles.instructions : styles.offscreen}>
                                    - Must be an email
                                </p>
                            </div>
                            <div className={styles.data2}>
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}>
                                    - 8 to 24 characters.<br />
                                    - Must include uppercase and lowercase letters, a number and a special character.
                                </p>
                            </div>
                            <div className={styles.data3}>
                                <label htmlFor="password">Confirm Password:</label>
                                <input
                                    type="password"
                                    id='confirm_pwd'
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby='confirmnote'
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? styles.instructions : styles.offscreen}>
                                    - Must match the first password input field.
                                </p>
                            </div>
                            <div className={styles.btn}>
                                <div className={styles.inner}></div>
                                <button type="submit"  onClick={handleSubmit}>Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Register
