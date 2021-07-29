import React, {useState, useContext, useEffect} from "react";
import { Link, Redirect } from "react-router-dom";

import { GoogleAuthContext } from "../utils/auth_context";

import GoogleSVG from "../../images/Google.svg";
import Github from "../../images/Github.svg";

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
            <>
                <main className="signup-main">
                    <section className="signup-inner-container">
                        <div className="intro">
                            <p>Join thousands of learners from around the world</p>
                            <p>Master web development by making real-life projects. There are multiple paths for you to choose</p>
                        </div>
                        <form className="form" onSubmit={e => login(e)}>
                            {showErrorMessage && <span className="main-msg-error">Incorrect username or password</span>}
                            <div className="email-form">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="text" name="email" placeholder="example@example.com"  onInput={e => setUsername(e.target.value)}/>
                            </div>
                            
                            <div className="email-form">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" onInput={e => setPassword(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn">Login</button>
                        </form>
    
                        <section className="social">
                            <p>or continue with these social profiles</p>
    
                            <div className="icons">
                                <img src={GoogleSVG} alt="google icon" onClick={() => googleSignIn()}/>
                                <img src={Github} alt="github icon" onClick={() => githubSignIn()} />
                            </div>
    
                            <p>Don't have an account yet? <Link to="/">Register</Link></p>
                        </section>
    
                    </section>
                </main>
            </>
        )
    }

    return null;

}

export default SignIn;