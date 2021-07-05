import React from "react";
import { Link } from "react-router-dom";

import GoogleSVG from "../../images/Google.svg";
import FacebookSVG from "../../images/Facebook.svg";
import Github from "../../images/Github.svg";
import Twitter from "../../images/Twitter.svg";

import "../../styles/signup.scss"

function SignUp() {
    

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
                            <input id="email" type="text" placeholder="example@example.com"/>
                        </div>
                        <div className="email-form">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password"/>
                        </div>
                        <button type="submit" className="btn">Start coding now</button>
                    </form>

                    <section className="social">
                        <p>or continue with these social profiles</p>

                        <div className="icons">
                            <img src={GoogleSVG} alt="google icon" />
                            <img src={FacebookSVG} alt="facebook icon" />
                            <img src={Twitter} alt="twitter icon" />
                            <img src={Github} alt="github icon" />
                        </div>

                        <p>Already a member? <Link to="/signin">Login</Link></p>
                    </section>

                </section>
            </main>

        </>

    )

}

export default SignUp;