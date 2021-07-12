import React, {useState, useEffect, useContext} from "react";
import {  Redirect } from "react-router-dom";

import ProfileComp from "./profile_comp";

import { GoogleAuthContext } from "../utils/auth_context";

import "../../styles/profile.scss";

function Profile() {
    
    const {googleAuth, githubAuth} = useContext(GoogleAuthContext);

    const [isAllowed, setIsAllowed] = useState(null);

    const [user, setUser] = useState({});

    const [bio, setBio] = useState("");
    
    useEffect(() => {
        const provider = sessionStorage.getItem("provider");

        if (provider === "google.com") {
            googleAuth.checkAuth();
        }
        else{
            githubAuth.checkAuth();
        }
    }, []);

    useEffect(() => {
        const provider = sessionStorage.getItem("provider");
        
        if (provider === "google.com") {
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
            }
        }
        else{
            if (githubAuth.status !== null && githubAuth.status === true ) {
                
                setIsAllowed(true);
                
                if (githubAuth.user !== undefined && Object.keys(githubAuth.user).length !== 0) {
                    
                    let userBio = githubAuth.user.bio;

                    setBio(`${userBio.substring(0,50)}...`);
                    
                    setUser(githubAuth.user);
                }
            
                console.log(githubAuth.user, "USER");
            }
            else if(githubAuth.status !== null && githubAuth.status === false){
                console.log("false");
                setIsAllowed(false);
            }
        }
    }, [googleAuth.status, googleAuth.user, githubAuth.status, githubAuth.user]);

    function logout() {
        const provider = sessionStorage.getItem("provider");
        
        if (provider === "google.com") {
            googleAuth.logout();
        }
        else{
            githubAuth.logout();
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