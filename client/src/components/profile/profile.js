import React, {useState, useEffect, useContext} from "react";
import {  Redirect } from "react-router-dom";

import ProfileComp from "./profile_comp";

import { GoogleAuthContext } from "../utils/auth_context";

import "../../styles/profile.scss";

function Profile() {
    
    const {googleAuth, githubAuth, emailAuth} = useContext(GoogleAuthContext);

    const [isAllowed, setIsAllowed] = useState(null);

    const [user, setUser] = useState({});

    const [bio, setBio] = useState("");
    
    useEffect(() => {
        const provider = sessionStorage.getItem("provider");

        if (provider === "google.com") {
            googleAuth.checkAuth();
        }
        else if(provider === "github.com"){
            githubAuth.checkAuth();
        }
        else if(provider === "email"){
            emailAuth.checkAuth();
        }
        else{
            setIsAllowed(false);
        }

    }, []);

    useEffect(() => {
        const provider = sessionStorage.getItem("provider");
        console.log(googleAuth.status, githubAuth.status, emailAuth.status);
        if (provider === "google.com") {
            console.log("test");
            if (googleAuth.status !== null && googleAuth.status === true ) {
                
                setIsAllowed(true);
                
                if (googleAuth.user !== undefined && Object.keys(googleAuth.user).length !== 0) {
                    let userBio = googleAuth.user.bio;

                    setBio(`${userBio.substring(0,50)}...`);
                    setUser(googleAuth.user);
                }
            }
            else if(googleAuth.status !== null && googleAuth.status === false){
                setIsAllowed(false);
                console.log("google false");
            }
        }
        else if(provider === "github.com"){
            if (githubAuth.status !== null && githubAuth.status === true ) {
                
                setIsAllowed(true);
                
                if (githubAuth.user !== undefined && Object.keys(githubAuth.user).length !== 0) {
                    
                    let userBio = githubAuth.user.bio;

                    setBio(`${userBio.substring(0,50)}...`);
                    
                    setUser(githubAuth.user);
                }
            }
            else if(githubAuth.status !== null && githubAuth.status === false){
                setIsAllowed(false);
            }
        }
        else{
            if (emailAuth.status !== null && emailAuth.status === true ) {
                setIsAllowed(true);

                if (emailAuth.user !== undefined && Object.keys(emailAuth.user).length !== 0) {
                    
                    let userBio = emailAuth.user.bio;

                    setBio(`${userBio.substring(0,50)}...`);
                    
                    setUser(emailAuth.user);
                }
            }
            else if(emailAuth.status !== null && emailAuth.status === false){
                setIsAllowed(false);
            }
        }

    }, [googleAuth.status, googleAuth.user, githubAuth.status, githubAuth.user, emailAuth.status, emailAuth.user]);

    function logout() {
        const provider = sessionStorage.getItem("provider");
        
        if (provider === "google.com") {
            googleAuth.logout();
            // sessionStorage.removeItem("provider");
        }
        else if(provider === "github.com"){
            githubAuth.logout();
            // sessionStorage.removeItem("provider");
        }
        else{
            emailAuth.logout();
            // sessionStorage.removeItem("provider");
        }
        
    }

    if (isAllowed === false && isAllowed !== null) {
        return <Redirect to="/"/>
    }

    if (isAllowed === true && isAllowed !== null) {
        return (
            <ProfileComp user={user} logout={logout} bio={bio}/>
        );
    }

    return null;

}

export default Profile;