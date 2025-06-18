import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from '../../services'
import toast from "react-hot-toast";

export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const login = async (email, password) => {

        setIsLoading(true);

        const response = await loginRequest({email, password})

        setIsLoading(false);

        console.log(response)

        if (response.error) {
            return toast.error(
            response.e?.response?.data?.msg || 
            response.e?.response?.data?.error || 
            'Ocurrió un error al iniciar sesión'
        );
        }

        const { userDetails } = response.data

        localStorage.setItem('user', JSON.stringify(userDetails));

        toast.success('Sesion iniciada correctamente')

        navigate('/admin')
    }

    return {
        login,
        isLoading,
    }
}