import { Link } from "react-router-dom";

import GoogleSVG from "../../images/Google.svg";
import Github from "../../images/Github.svg";

export default function SignUpComponent({signUp, showErrorMessage, message, isValidEmail, checkEmail, checkPassword, isValidPassword, googleSignIn, githubSignIn}) {
    
    return (
        <main className="signup-main">
            <section className="signup-inner-container">
                <div className="intro">
                    <p>Join thousands of learners from around the world</p>
                    <p>Master web development by making real-life projects. There are multiple paths for you to choose</p>
                </div>
                <form className="form" onSubmit={e => signUp(e)}>
                {showErrorMessage && <span className="main-msg-error">{message}</span>}
                    <div className="email-form">
                        <label htmlFor="email">Email</label>
                        <input id="email" type="text" placeholder="example@example.com" onInput={e => checkEmail(e.target.value)}/>
                        {!isValidEmail && <span className="msg-error">enter a valid email</span>}
                    </div>
                    <div className="email-form">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" onInput={e => checkPassword(e.target.value)}/>
                        {!isValidPassword && <span className="msg-error">your password must be greater or equal to 6 characters</span>}
                    </div>
                    <button type="submit" className="btn">Start coding now</button>
                </form>

                <section className="social">
                    <p>or continue with these social profiles</p>

                    <div className="icons">
                        <img src={GoogleSVG} alt="google icon" onClick={() => googleSignIn()} />
                        <img src={Github} alt="github icon" onClick={() => githubSignIn()}/>
                    </div>

                    <p>Already a member? <Link to="/signin">Login</Link></p>
                </section>
            </section>
        </main>
    )
}