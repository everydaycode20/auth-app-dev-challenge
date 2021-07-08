import React, {useState, useContext, useEffect} from "react";
import { Link, Redirect } from "react-router-dom";

import { GoogleAuthContext } from "../utils/auth_context";

import GoogleSVG from "../../images/Google.svg";
import FacebookSVG from "../../images/Facebook.svg";
import Github from "../../images/Github.svg";
import Twitter from "../../images/Twitter.svg";

import "../../styles/signup.scss"

function SignIn() {
    
    const {googleAuth} = useContext(GoogleAuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isSignedIn, setIsSignedIn] = useState(null);

    function registerEmail(e) {
        console.log(e);
    }

    useEffect(() => {
        
        if (googleAuth.status !== null && googleAuth.status === true) {
            console.log(googleAuth.status, "STATUS");
            setIsSignedIn(true);
        }
        else if(googleAuth.status !== null && googleAuth.status === false){
            setIsSignedIn(false);
        }
        
    }, [googleAuth.status]);

    useEffect(() => {
        googleAuth.checkAuth();
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
                            <p>Master web development by making real-life projects. There are multiple paths for you yo choose</p>
                        </div>
                        <form className="form" action="">
                            <div className="email-form">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="text" name="email" placeholder="example@example.com"  onInput={e => registerEmail(e.target.value)}/>
                            </div>
                            
                            <div className="email-form">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password"/>
                            </div>
                            <button type="submit" className="btn">Login</button>
                        </form>
    
                        <section className="social">
                            <p>or continue with these social profiles</p>
    
                            <div className="icons">
                                <img src={GoogleSVG} alt="google icon" onClick={() => googleSignIn()}/>
                                <img src={FacebookSVG} alt="facebook icon" />
                                <img src={Twitter} alt="twitter icon" />
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