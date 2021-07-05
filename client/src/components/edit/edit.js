import React, {useState} from "react";
import { Link } from "react-router-dom";

import "../../styles/edit.scss";
import Back from "../../images/arrow_back.svg";
import PhotoCamera from "../../images/photo_camera.svg";

function Edit() {
    
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
            <main className="profile-main-container">
                <div className="back">
                    <Link to="/profile">
                        <img src={Back} alt="back"/>
                        <p>Back</p>
                    </Link>
                </div>
                <section className="profile-inner-container">
                    <div className="profile-msg">
                        <h1>Change info</h1>
                        <p>Changes will be reflected to every services</p>
                    </div>
                    <div className="profile-img">
                        <div className="img-container">
                            <img src="https://images.unsplash.com/photo-1624973383893-5b3a1584c252?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="profile" />
                            <div className="overlay">
                                <img src={PhotoCamera} alt="camera" />
                            </div>
                        </div>
                        <h3>CHANGE PHOTO</h3>
                    </div>
                    <form className="form-container" action="">
                        <div className="form">
                            <label htmlFor="">Name</label>
                            <input type="text" placeholder="enter your name" />
                        </div>
                        <div className="form">
                            <label htmlFor="bio">Bio</label>
                            <textarea id="bio"  placeholder="enter your bio"/>
                        </div>
                        <div className="form">
                            <label htmlFor="phone">phone</label>
                            <input id="phone" type="tel"/>
                        </div>
                        <div className="form">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" placeholder="example@example.com"/>
                        </div>
                        <div className="form">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" placeholder="enter your new password"/>
                        </div>
                        <button type="submit" className="btn">Save</button>
                    </form>
                </section>
            </main>
        </>
    )

}

export default Edit;