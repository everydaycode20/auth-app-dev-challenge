import React, {useState} from "react";
import { Link } from "react-router-dom";

import "../../styles/profile.scss";

function Profile() {
    
    const [dropdown, setDropdown] = useState(false);

    function showDropdown() {
        setDropdown(true);

        if (dropdown) {
            setDropdown(false)
        }
    }

    return (
        <>
        <header className="profile-header">
            <div onClick={() => showDropdown(true)} className="profile-options">
                <img src="https://images.unsplash.com/photo-1624973383893-5b3a1584c252?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="profile" />
                <span>name last name</span>
                <div className="triangle" style={{transform: dropdown && "rotateZ(-180deg)"}}></div>
            </div>
            {dropdown && <div className="dropdown">
                <div>
                    <p>My Profile</p>
                </div>
                <div>
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
                        <img src="https://images.unsplash.com/photo-1624973383893-5b3a1584c252?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="profile" />
                    </div>
                </div>
                <div className="profile-name">
                    <h3>NAME</h3>
                    <p>name last name</p>
                </div>
                <div className="profile-bio">
                    <h3>BIO</h3>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <div className="profile-email">
                    <h3>EMAIL</h3>
                    <p>example@example.com</p>
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

export default Profile;