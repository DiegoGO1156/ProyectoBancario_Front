import { useState } from "react";
import { logout as logoutHandler } from './userLogout'; 

const getUserDetails = () => {
    const userDetails = localStorage.getItem("user")
    return userDetails ? JSON.parse(userDetails) : null;
}

export const useUserDetails = () => {
    const [userDetails] = useState(getUserDetails())

    const logout = () => {
        logoutHandler(); 
    }

    return {
        isLogged: Boolean(userDetails),
        username: userDetails?.username || "Guest",
        logout
    }
}
