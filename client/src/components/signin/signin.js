import React, {useState, useContext, useEffect} from "react";
import { Link, Redirect } from "react-router-dom";

import { GoogleAuthContext } from "../utils/auth_context";

import GoogleSVG from "../../images/Google.svg";
import Github from "../../images/Github.svg";

import SignInComp from "./signin_comp";

import "../../styles/signup.scss"

function SignIn() {
    
    const {googleAuth, githubAuth, emailAuth} = useContext(GoogleAuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isSignedIn, setIsSignedIn] = useState(null);

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    function login(e) {
        e.preventDefault();

        emailAuth.signIn(username, password);

    }

    useEffect(() => {
        console.log("UE SIGN IN");
        const provider = sessionStorage.getItem("provider");
        
        if (googleAuth.status === false || githubAuth.status === false || emailAuth.status === false) {
            setIsSignedIn(false);
            setShowErrorMessage(true);
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
        setShowErrorMessage(false);
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

    if (isSignedIn === true && isSignedIn !== null) {
        return <Redirect to="/profile"/>
    }

    if (isSignedIn === false && isSignedIn !== null) {
        return (
            <SignInComp showErrorMessage={showErrorMessage} login={login} setUsername={setUsername} setPassword={setPassword} googleSignIn={googleSignIn} githubSignIn={githubSignIn}/>
        )
    }

    return null;

}

export default SignIn;