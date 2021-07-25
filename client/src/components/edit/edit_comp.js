import React, {useState, useRef} from "react";
import { Link } from "react-router-dom";

import Back from "../../images/arrow_back.svg";
import PhotoCamera from "../../images/photo_camera.svg";
import LogoutIcon from "../../images/logout_icon.svg";
import Profile from "../../images/profile_filled.svg";

export default function EditComp({user, name, setName, bio, setBio, phone, setPhone, email, setEmail, provider, showMessage, logout, editProfile, uploadImage}) {

    const [dropdown, setDropdown] = useState(false);

    const inputFile = useRef(null);

    const [image, setImage] = useState("");

    const [oneImage, setOneImage] = useState(null);

    const [imageError, setImageError] = useState(false);

    const [messageError, setMessageError] = useState("");

    function showDropdown() {
        setDropdown(true);

        if (dropdown) {
            setDropdown(false)
        }
    }
    
    function openInput() {
        inputFile.current.click();
    }

    function handleFile(e) {    

        if (!e.target.files[0].name.match(/.(jpg|jpeg|png)$/i)) {
            setMessageError("upload a png, jpg or jpeg image");
            setImageError(true);
            setTimeout(() => {
                setImageError(false);
            }, 3000);
        }
        if (e.target.files[0].size > 1_000_000) {
            setMessageError("upload an image smaller than 1 MB");
            setImageError(true);
        }
        else{
            setImageError(false);
            const form = new FormData();
            form.append("file", e.target.files[0]);
            uploadFile(form);
        }
        
    }

    function uploadFile(file) {
        
        uploadImage.uploadImage(file, user.id).then(data => {
            setImage(data.image);
            setOneImage(true);
        });
    }

    return (
        <>
            <header className="profile-header">
                <div onClick={() => showDropdown(true)} className="profile-options" tabIndex="0">
                    <img src={oneImage ? image : user.photo} alt="profile" />
                    <span>{user.name}</span>
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
                        <div className="img-container" tabIndex="0" onClick={() => openInput()}>
                            <img src={oneImage ? image : user.photo} alt="profile" />
                            <form >
                                <input style={{display:'none'}} type="file" name="file" accept="image/png, image/jpeg, image/jpg" ref={inputFile} onChange={e => handleFile(e)}/>                            
                            </form>
                            <div className="overlay">
                                <img src={PhotoCamera} alt="camera" className="camera" />
                            </div>
                            {imageError && <p  className="imageError">{messageError}</p>}
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
                        {(provider !== "google.com" || provider !== "github.com") ? null : <div className="form">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" placeholder="enter your new password"/>
                        </div>}
                        <button type="submit" className="btn">Save</button>
                    </form>
                </section>
            </main>
            {showMessage && <div className="message">
                <p>information saved correctly</p>
            </div>}
        </>
    )

}