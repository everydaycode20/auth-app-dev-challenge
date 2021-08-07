import React, { useState } from "react";
import {  Link } from "react-router-dom";

import LogoutIcon from "../../images/logout_icon.svg";
import Profile from "../../images/profile_filled.svg";
import Skeleton from "./skeleton";

export default function ProfileComp({user, logout, bio}) {
    
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
                    {user.photo || user.photo === "" ? <img src={user.photo || Profile} alt="profile" /> : <Skeleton width={"45px"} height={"45px"}/>}
                    {user.name || user.name === "" ? <span>{user.name || ""}</span> : <Skeleton width={"115px"} height={"17px"}/>}
                    <div className="triangle" style={{transform: dropdown && "rotateZ(-180deg)"}}></div>
                </div>
                {dropdown && <div className="dropdown">
                    <div className="profile-link-container">
                        <img src={Profile} alt="profile" />
                        <Link to="/profile">My Profile</Link>
                    </div>
                    <div className="logout-container" onClick={() => logout()}>
                        <img src={LogoutIcon} alt="logout" />
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
                        {user.photo || user.photo === "" ? <div className="img-container">
                            <img src={user.photo || Profile} alt="profile"/>
                        </div> : <div style={{width: "80%"}}><Skeleton width={"70px"} height={"70px"}/></div>}
                    </div>
                    <div className="profile-name">
                        <h3>NAME</h3>
                        {user.name || user.name === "" ? <p>{user.name || ""}</p> : <Skeleton width={"391px"} height={"24px"}/>}
                    </div>
                    <div className="profile-bio">
                        <h3>BIO</h3>
                        {bio ? <p>{bio}</p> : <Skeleton width={"391px"} height={"24px"}/>}
                    </div>
                    <div className="profile-email">
                        <h3>EMAIL</h3>
                        {user.email ? <p>{user.email}</p> : <Skeleton width={"391px"} height={"24px"}/>}
                    </div>
                    <div className="profile-pass">
                        <h3>PASSWORD</h3>
                        <p>*********</p>
                    </div>
                </section>
            </main>
            </>
    )

}