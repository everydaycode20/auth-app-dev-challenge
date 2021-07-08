import React, {useState} from "react";

import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyChKJMvjRp2u_vRrnRDOmEPfWxiaSRS4W8",
    authDomain: "auth-app-f4181.firebaseapp.com",
    projectId: "auth-app-f4181",
    storageBucket: "auth-app-f4181.appspot.com",
    messagingSenderId: "297429758487",
    appId: "1:297429758487:web:25d64043992e002218e252"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

/**
 * 
 * authentication hook
 * 
 * @returns status, signIn, checkAuth
 * 
*/

export function useAuth() {

    /**
     * 
     * @returns status, user, signIn, checkAuth, logout, edit
     * 
     */

    function useGoogleAuth() {

        const [status, setStatus] = useState(null);

        const [user, setUser] = useState({});

        const provider = new firebase.auth.GoogleAuthProvider();

        /**
         * 
         * signs the user with google services
         * 
         */

        function signIn() {
            
            firebase.auth().signInWithPopup(provider).then(result => {
                
                console.log(result);
                const {accessToken} = result.credential;
                
                result.user.getIdToken().then(idToken => {
                    
                    fetch("/auth/google-signin", {
                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify({"idToken": idToken, "csrfToken": accessToken}),
                        headers: {
                            "Content-Type": "application/json"
                        },
                    }).then(res => res.json()).then(status => {
                        console.log("AUTH");
                        setStatus(status.status);
                        sessionStorage.setItem("provider", status.provider)
                    });
                    
                });
                
            });
        }
        
        /**
         * 
         * checks whether user session is verified
         * 
         */

        function checkAuth() {

            fetch("/auth/google/profile", {credentials: "include", withCredentials: true}).then(res => res.json()).then(data => {
                const {user} = data;
                console.log(data.user);
                setStatus(data.status);
                setUser(user);
                
            });
        }
        
        function logout() {
            fetch("/auth/logout", {credentials: "include"}).then(res => res.json()).then(status => {
                console.log(status);
                setStatus(status.status);
            });
        }

        function edit(name, bio, phone, email, id) {
            
            fetch("/auth/google-edit", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({"id": id, "name": name, "bio": bio, "phone": phone, "email": email}),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then(data => {
                console.log(data);
            })
        }

        return {
            status,
            user,
            signIn,
            checkAuth,
            logout,
            edit
        }
    }
    
    /**
     * 
     * @returns status, user, signIn, checkAuth, logout, edit
     * 
     */

    function useAuthGithub() {

        const [status, setStatus] = useState(null);

        const [user, setUser] = useState({});

        const provider = new firebase.auth.GithubAuthProvider();

        function signIn() {
            
            firebase.auth().signInWithPopup(provider).then(result => {
                console.log(result);
                const {accessToken} = result.credential;

                result.user.getIdToken().then(idToken => {
                    console.log(idToken);
                    fetch("/auth/github-signin", {
                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify({"idToken": idToken, "csrfToken": accessToken}),
                        headers: {
                            "Content-Type": "application/json"
                        },
                    }).then(res => res.json()).then(status => {
                        console.log(status);
                        console.log("AUTH GITHUB");
                        setStatus(status.status);
                        sessionStorage.setItem("provider", status.provider)
                    });
                });
            });
        }

        function checkAuth() {

            fetch("/auth/github/profile", {credentials: "include", withCredentials: true}).then(res => res.json()).then(data => {
                const {user} = data;
                console.log(data.user);
                setStatus(data.status);
                setUser(user); 
            });
        }

        return {
            status,
            user,
            signIn,
            checkAuth,
        }
    }

    return {
        useGoogleAuth,
        useAuthGithub
    }

}

