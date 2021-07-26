import React, {useState, useContext, useEffect} from "react";
import { Link, Redirect } from "react-router-dom";

import { GoogleAuthContext } from "../utils/auth_context";

import GoogleSVG from "../../images/Google.svg";
import FacebookSVG from "../../images/Facebook.svg";
import Github from "../../images/Github.svg";
import Twitter from "../../images/Twitter.svg";

import "../../styles/signup.scss"

function SignIn() {
    
    const {googleAuth, githubAuth, emailAuth} = useContext(GoogleAuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isSignedIn, setIsSignedIn] = useState(null);

    function login(e) {
        e.preventDefault();

        emailAuth.signIn(username, password);

    }

    useEffect(() => {
        
        if (googleAuth.status !== null && googleAuth.status === true) {
            console.log(googleAuth.status, "STATUS");
            setIsSignedIn(true);
        }
        else if(googleAuth.status !== null && googleAuth.status === false){
            setIsSignedIn(false);
        }
        else if(emailAuth.status !== null && emailAuth.status === true){
            setIsSignedIn(true);
        }
        
    }, [googleAuth.status, emailAuth.status]);

    useEffect(() => {
        const provider = sessionStorage.getItem("provider");
        if (provider === "google.com") {
            googleAuth.checkAuth();
        }
        else if (provider === "github.com") {
            githubAuth.checkAuth();
        }
        else{
            setIsSignedIn(false);
        }
    }, []);

    function googleSignIn() {
        googleAuth.signIn();
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
                                <img src={Github} alt="github icon" />
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