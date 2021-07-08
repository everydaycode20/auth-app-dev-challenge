import React, {useState, useEffect, useContext} from "react";
import { Link, Redirect } from "react-router-dom";

import { GoogleAuthContext } from "../utils/auth_context";

import GoogleSVG from "../../images/Google.svg";
import FacebookSVG from "../../images/Facebook.svg";
import Github from "../../images/Github.svg";
import Twitter from "../../images/Twitter.svg";

import "../../styles/signup.scss";

function SignUp() {

    const {googleAuth, githubAuth} = useContext(GoogleAuthContext);
    // const {githubAuth} = useContext(GithubAuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSignedIn, setIsSignedIn] = useState(null);
    
    function signUp(e) {
        e.preventDefault();

        fetch("/signup", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({email, password}),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => res.json()).then(status => {
            
            console.log(status);
        });
    }

    useEffect(() => {
        const provider = sessionStorage.getItem("provider");
        console.log(provider);
        
        if (provider === "google.com") {
            if (googleAuth.status !== null && googleAuth.status === true) {
                console.log(googleAuth.status, "STATUS");
                setIsSignedIn(true);
            }
            else if(googleAuth.status !== null && googleAuth.status === false){
                setIsSignedIn(false);
            }
        }
        else{
            if (githubAuth.status !== null && githubAuth.status === true) {
                console.log(googleAuth.status, "STATUS");
                setIsSignedIn(true);
            }
            else if(githubAuth.status !== null && githubAuth.status === false){
                setIsSignedIn(false);
            }
        }
    }, [googleAuth.status, githubAuth.status]);

    useEffect(() => {
        console.log("signup auth");
        googleAuth.checkAuth();
        githubAuth.checkAuth();
    }, []);

    function googleSignIn() {
        googleAuth.signIn();
    }
    
    function githubSignIn() {
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
                        <form className="form" onSubmit={e => signUp(e)}>
                            <div className="email-form">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="text" placeholder="example@example.com" onInput={e => setEmail(e.target.value)}/>
                            </div>
                            <div className="email-form">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" onInput={e => setPassword(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn">Start coding now</button>
                        </form>
    
                        <section className="social">
                            <p>or continue with these social profiles</p>
    
                            <div className="icons">
                                <img src={GoogleSVG} alt="google icon" onClick={() => googleSignIn()} />
                                <img src={FacebookSVG} alt="facebook icon" />
                                <img src={Twitter} alt="twitter icon" />
                                <img src={Github} alt="github icon" onClick={() => githubSignIn()}/>
                            </div>
    
                            <p>Already a member? <Link to="/signin">Login</Link></p>
                        </section>
    
                    </section>
                </main>
    
            </>
    
        )
    }

    return null;

}

export default SignUp;