import React, {useState, useContext, useEffect} from "react";
import { Redirect } from "react-router-dom";

import EditComp from "./edit_comp";

import { GoogleAuthContext } from "../utils/auth_context";

import "../../styles/edit.scss";

function Edit() {
    
    const {googleAuth, githubAuth, uploadImage, emailAuth} = useContext(GoogleAuthContext);

    const [isAllowed, setIsAllowed] = useState(null);

    const [user, setUser] = useState({});

    const [name, setName] = useState("");

    const [bio, setBio] = useState("");

    const [email, setEmail] = useState("");

    const [phone, setPhone] = useState("");

    const [provider, setProvider] = useState("");

    const [showMessage, setShowMessage] = useState(false);
    
    useEffect(() => {
        const provider = sessionStorage.getItem("provider");

        if (provider === "google.com") {
            if (googleAuth.status !== null && googleAuth.status === true) {
                console.log("true");
                setIsAllowed(true);
                console.log(googleAuth.user);
                setUser(googleAuth.user);
                setName(googleAuth.user.name);
                setBio(googleAuth.user.bio);
                setEmail(googleAuth.user.email);
                setPhone(googleAuth.user.phone);
                setProvider(googleAuth.user.provider);
            }
            else if(googleAuth.status !== null && googleAuth.status === false){
                setIsAllowed(false);
            }
        }
        else if(provider === "github.com"){
            if (githubAuth.status !== null && githubAuth.status === true) {
                setIsAllowed(true);
                setUser(githubAuth.user);
                setName(githubAuth.user.name);
                setBio(githubAuth.user.bio);
                setEmail(githubAuth.user.email);
                setPhone(githubAuth.user.phone);
                setProvider(githubAuth.user.provider);
            }
            else if(githubAuth.status !== null && githubAuth.status === false){
                setIsAllowed(false);
            }
        }
        else{
            if (emailAuth.status !== null & emailAuth.status === true) {
                setIsAllowed(true);
                setUser(emailAuth.user);
                setName(emailAuth.user.name);
                setBio(emailAuth.user.bio);
                setEmail(emailAuth.user.email);
                setPhone(emailAuth.user.phone);
                setProvider(emailAuth.user.provider);
            }
            else if (emailAuth.status !== null && emailAuth.status === false) {
                setIsAllowed(false);
            }
        }

    }, [googleAuth.status, googleAuth.user, githubAuth.status, githubAuth.user, emailAuth.status, emailAuth.user]);

    useEffect(() => {
        const provider = sessionStorage.getItem("provider");

        if (provider === "google.com") {
            googleAuth.checkAuth();
        }
        else if(provider === "github.com"){
            githubAuth.checkAuth();
        }
        else{
            emailAuth.checkAuth();
        }
    }, []);

    function editProfile(e) {
        const provider = sessionStorage.getItem("provider");

        e.preventDefault();

        if (provider === "google.com") {
            googleAuth.edit(name, bio, phone, email, googleAuth.user.id).then(data => {
                console.log(data);
                if (data.status === true) {
                    setShowMessage(true);

                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                }
            });
        }
        else if(provider === "github.com"){
            githubAuth.edit(name, bio, phone, email, githubAuth.user.id).then(data => {
                console.log(data);
                if (data.status === true) {
                    setShowMessage(true);

                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                }
            });
        }
        else{
            emailAuth.edit(name, bio, phone, email, githubAuth.user.id).then(data => {
                console.log(data);
                if (data.status === true) {
                    setShowMessage(true);

                    setTimeout(() => {
                        setShowMessage(false);
                    }, 3000);
                }
            });
        }
    }
    
    function logout() {
        const provider = sessionStorage.getItem("provider");
        
        if (provider === "google.com") {
            googleAuth.logout();
            sessionStorage.removeItem("provider");
        }
        else if(provider === "github.com"){
            githubAuth.logout();
            sessionStorage.removeItem("provider");
        }
        else{
            emailAuth.logout();
            sessionStorage.removeItem("provider");
        }
    }

    if (isAllowed === false && isAllowed !== null) {
        return <Redirect to="/"/>
    }
    
    if (isAllowed === true && isAllowed !== null) {
        return (
            <EditComp user={user} name={name} setName={setName} bio={bio} setBio={setBio} phone={phone} setPhone={setPhone} email={email} setEmail={setEmail} provider={provider} showMessage={showMessage} logout={logout} editProfile={editProfile} uploadImage={uploadImage} emailAuth={emailAuth}/>
        )
    }

    return null;

}

export default Edit;