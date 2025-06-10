import { useState } from "react"
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import Navbar from "../components/Navbar/Navbar";

export const Auth = () => {

    const [isLogin, setIsLogin] = useState(true);

    const handleAuthPageToggle = () => {
        setIsLogin((prev) => !prev)
    }

    return (
        <div className="auth-container">
            <Navbar/>
            {isLogin ? (
                <Login switchAuthHandler={handleAuthPageToggle} />
            ) : (
                <Register switchAuthHandler={handleAuthPageToggle} />
            )}
        </div>
    )
}