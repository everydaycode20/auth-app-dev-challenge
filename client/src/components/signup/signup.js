import React, {useState, useEffect, useContext} from "react";
import { Link, Redirect } from "react-router-dom";

import { GoogleAuthContext } from "../utils/auth_context";

import SignUpComponent from "./signup_comp";


import "../../styles/signup.scss";

function SignUp() {

    const {googleAuth, githubAuth, emailAuth} = useContext(GoogleAuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSignedIn, setIsSignedIn] = useState(null);
    
    const [isRegistered, setIsRegistered] = useState(null);

    const [isValidEmail, setIsValidEmail] = useState(true);

    const [isValidPassword, setIsValidPassword] = useState(true);

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [message, setMessage] = useState("");

    function signUp(e) {
        e.preventDefault();

        if (isValidPassword && isValidEmail) {
            emailAuth.signUp(email, password).then(status => {
                
                if (status.status === true) {
                    setIsRegistered(true);
                }
                else{
                    setMessage(status.message);
                    setShowErrorMessage(true);
                }
            });
        }
        else{
            setMessage("your email or password are not correct");
            setShowErrorMessage(true);
        }
    }

    function checkEmail(e) {
        
        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,}$/;

        if (regex.test(e)) {
            setIsValidEmail(true);
            setEmail(e);
        }
        else{
            setIsValidEmail(false);
        }
    }

    function checkPassword(e) {
        
        if (e.length >= 6) {
            setIsValidPassword(true);
            setPassword(e);
        }
        else{
            setIsValidPassword(false);
        }
    }

    useEffect(() => {
        const provider = sessionStorage.getItem("provider");
        
        if (googleAuth.status === false || githubAuth.status === false || emailAuth.status === false) {
            setIsSignedIn(false);
            sessionStorage.removeItem("provider");
        }
        else{
            if (provider === "google.com") {
                if (googleAuth.status !== null && googleAuth.status === true) {
                    setIsSignedIn(true);
                }
                else if(googleAuth.status !== null && googleAuth.status === false){
                    setIsSignedIn(false);
                }
            }
            else if(provider === "github.com"){
                if (githubAuth.status !== null && githubAuth.status === true) {
                    setIsSignedIn(true);
                }
                else if(githubAuth.status !== null && githubAuth.status === false){
                    setIsSignedIn(false);
                }
            }
            else{
                if (emailAuth.status !== null && emailAuth.status === true) {
                    setIsSignedIn(true);
                }
                else if(emailAuth.status !== null && emailAuth.status === false){
                    setIsSignedIn(false);
                }
            }
        }
        
    }, [googleAuth.status, githubAuth.status, emailAuth.status]);

    useEffect(() => {
        
        const provider = sessionStorage.getItem("provider");
        if (provider === "google.com") {
            googleAuth.checkAuth();
        }
        else if (provider === "github.com") {
            githubAuth.checkAuth();
        }
        else if(provider === "email"){
            emailAuth.checkAuth();
        }
        else{
            setIsSignedIn(false);
        }

    }, []);

    function googleSignIn() {
        sessionStorage.setItem("provider", "google.com")
        googleAuth.signIn();
    }
    
    function githubSignIn() {
        sessionStorage.setItem("provider", "github.com")
        githubAuth.signIn();
    }

    if (isRegistered) {
        return <Redirect to="/signin"/>
    }

    if (isSignedIn === true && isSignedIn !== null) {
        return <Redirect to="/profile"/>
    }

    if (isSignedIn === false && isSignedIn !== null) {
        return <SignUpComponent signUp={signUp} showErrorMessage={showErrorMessage} message={message} isValidEmail={isValidEmail} checkEmail={checkEmail} checkPassword={checkPassword} isValidPassword={isValidPassword} googleSignIn={googleSignIn} githubSignIn={githubSignIn}/>
    }

    return null;

}

export default SignUp;