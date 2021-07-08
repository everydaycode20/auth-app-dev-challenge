import React, {useState, useEffect, useContext} from "react";
import {  Link, Redirect } from "react-router-dom";

import { GoogleAuthContext } from "../utils/auth_context";

import "../../styles/profile.scss";

function Profile() {
    
    const {googleAuth, githubAuth} = useContext(GoogleAuthContext);

    const [dropdown, setDropdown] = useState(false);

    const [isAllowed, setIsAllowed] = useState(null);

    const [user, setUser] = useState({});

    function showDropdown() {
        setDropdown(true);

        if (dropdown) {
            setDropdown(false)
        }
    }
    debugger;
    
    useEffect(() => {
        googleAuth.checkAuth();
        githubAuth.checkAuth();
    }, []);

    useEffect(() => {
        const provider = sessionStorage.getItem("provider");
        console.log(provider);

        console.log("status profile");
        console.log(googleAuth.status);
        
        if (provider === "google.com") {
            if (googleAuth.status !== null && googleAuth.status === true ) {
                console.log("true");
                setIsAllowed(true);
                console.log(googleAuth.user);
                if (googleAuth.user !== undefined) {
                    setUser(googleAuth.user);
                }
            
                console.log(googleAuth.user, "USER");
            }
            else if(googleAuth.status !== null && googleAuth.status === false){
                console.log("false");
                setIsAllowed(false);
            }
        }
        else{
            if (githubAuth.status !== null && githubAuth.status === true ) {
                console.log("true");
                setIsAllowed(true);
                console.log(googleAuth.user);
                if (githubAuth.user !== undefined) {
                    setUser(githubAuth.user);
                }
            
                console.log(githubAuth.user, "USER");
            }
            else if(githubAuth.status !== null && githubAuth.status === false){
                console.log("false");
                setIsAllowed(false);
            }
        }
        

    }, [googleAuth.status, googleAuth.user, githubAuth.status, githubAuth.user, ]);

    function logout() {
        googleAuth.logout();
        
    }

    if (isAllowed === false && isAllowed !== null) {
        return <Redirect to="/"/>
    }

    if (isAllowed === true && isAllowed !== null) {
        return (
            <>
            <header className="profile-header">
                <div onClick={() => showDropdown(true)} className="profile-options">
                    <img src={user.photo} alt="profile" />
                    <span>{user.name}</span>
                    <div className="triangle" style={{transform: dropdown && "rotateZ(-180deg)"}}></div>
                </div>
                {dropdown && <div className="dropdown">
                    <div>
                        <p>My Profile</p>
                    </div>
                    <div onClick={() => logout()}>
                        <p>Logout</p>
                    </div>
                </div>}
            </header>
            <main className="profile-main">
                <div className="profile-msg">
                    <h1>Personal info</h1>
                    <p>Basic info, like your name and photo</p>
                </div>
                <section className="profile-inner-container">
                    <div className="profile-edit">
                        <div>
                            <h2>Profile</h2>
                            <p>Some info may be visible to other people</p>
                        </div>
                        <Link to="/edit">Edit</Link>
                    </div>
                    <div className="profile-img">
                        <h3>PHOTO</h3>
                        <div className="img-container">
                            <img src={user.photo} alt="profile" />
                        </div>
                    </div>
                    <div className="profile-name">
                        <h3>NAME</h3>
                        <p>{user.name}</p>
                    </div>
                    <div className="profile-bio">
                        <h3>BIO</h3>
                        <p>{user.bio}</p>
                    </div>
                    <div className="profile-email">
                        <h3>EMAIL</h3>
                        <p>{user.email}</p>
                    </div>
                    <div className="profile-pass">
                        <h3>PASSWORD</h3>
                        <p>*********</p>
                    </div>
                </section>
            </main>
            </>
        );
    }

    return null;

}

export default Profile;