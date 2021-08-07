import { Link } from "react-router-dom";

import GoogleSVG from "../../images/Google.svg";
import Github from "../../images/Github.svg";

export default function SignInComp({showErrorMessage, login, setUsername, setPassword, googleSignIn, githubSignIn}) {
    
    return (
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
    );
}