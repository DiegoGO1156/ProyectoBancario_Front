import { useState } from "react"
import { Login } from "../components/Login";
import { Profile } from "../components/settings/Profile"
import { UserD } from '../components/UserD'

export const User = () => {

    const [isUser, setIsuser] = useState(true);

    const handleUserPageToggle = () => {
        setIsuser((prev) => !prev)
    }

    return (
        <div className="auth-container">
            {isUser ? (
                <UserD switchAuthHandler={handleUserPageToggle} />
            ) : (
                <Profile switchAuthHandler={handleUserPageToggle} />
            )}
        </div>
    )
}