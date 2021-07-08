import React, {useState, useContext, useEffect} from "react";
import { Link, Redirect } from "react-router-dom";

import { GoogleAuthContext } from "../utils/auth_context";

import "../../styles/edit.scss";
import Back from "../../images/arrow_back.svg";
import PhotoCamera from "../../images/photo_camera.svg";

function Edit() {
    
    const {auth} = useContext(GoogleAuthContext);

    const [dropdown, setDropdown] = useState(false);

    const [isAllowed, setIsAllowed] = useState(null);

    const [user, setUser] = useState({});

    const [name, setName] = useState("");

    const [bio, setBio] = useState("");

    const [email, setEmail] = useState("");

    const [phone, setPhone] = useState("");

    const [provider, setProvider] = useState("");

    function showDropdown() {
        setDropdown(true);

        if (dropdown) {
            setDropdown(false)
        }
    }
    
    useEffect(() => {
        
        console.log("status profile");
        console.log(auth.status);
        
        if (auth.status !== null && auth.status === true) {
            console.log("true");
            setIsAllowed(true);
            console.log(auth.user);
            setUser(auth.user);
            setName(auth.user.name);
            setBio(auth.user.bio);
            setEmail(auth.user.email);
            setPhone(auth.user.phone);
            setProvider(auth.user.provider);
        }
        else if(auth.status !== null && auth.status === false){
            console.log("false");
            setIsAllowed(false);
        }

    }, [auth.status, auth.user]);

    useEffect(() => {
        auth.checkAuth();
    }, []);

    function editProfile(e) {
        e.preventDefault();

        auth.edit(name, bio, phone, email, auth.user.id);
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
                                <img src={user.photo} alt="profile" />
                                <div className="overlay">
                                    <img src={PhotoCamera} alt="camera" />
                                </div>
                            </div>
                            <h3>CHANGE PHOTO</h3>
                        </div>
                        <form className="form-container" onSubmit={e => editProfile(e)}>
                            <div className="form">
                                <label htmlFor="">Name</label>
                                <input type="text" defaultValue={name} placeholder="enter your name" onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className="form">
                                <label htmlFor="bio">Bio</label>
                                <textarea id="bio" defaultValue={bio} placeholder="enter your bio" onChange={e => setBio(e.target.value)}/>
                            </div>
                            <div className="form">
                                <label htmlFor="phone">phone</label>
                                <input id="phone" defaultValue={phone} type="tel" onChange={e => setPhone(e.target.value)}/>
                            </div>
                            <div className="form">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="text" defaultValue={email} placeholder="example@example.com" onChange={e => setEmail(e.target.value)}/>
                            </div>
                            {provider !== "google.com" && <div className="form">
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" placeholder="enter your new password"/>
                            </div>}
                            <button type="submit" className="btn">Save</button>
                        </form>
                    </section>
                </main>
            </>
        )
    }

    return null;

}

export default Edit;