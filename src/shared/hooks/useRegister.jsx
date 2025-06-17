import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services";
import toast from "react-hot-toast";

export const useRegister = () => {

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const register = async (name, username, dpi, phone, companyName, income, email, address, password) => {

        setIsLoading(true)

        const response = await registerRequest({ name, username, dpi, phone, companyName, income, email, address, password })

        console.log(response)
        setIsLoading(false)

        if(response.error){
            return toast.error(response.error?.response?.data || 'Ocurrio un error al registrar, intenta de nuevo')
        }

        const { userDetails } = response.data

        localStorage.setItem('user', JSON.stringify(userDetails));

        toast.success('Usuario registrado exitosamente');

        navigate('/')
    }

    return { 
        register,
        isLoading
    }
}
