import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services";
import toast from "react-hot-toast";

export const useRegister = () => {

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const register = async (name, username, dpi, phone, companyName, income, email, address, password) => {

    setIsLoading(true);

    try {
        const response = await registerRequest({ name, username, dpi, phone, companyName, income, email, address, password });

        console.log(response);

        if (response.error) {
            toast.error(response.error?.response?.data || 'Ocurrió un error al registrar, intenta de nuevo');
            return;
        }

        const { userDetails } = response.data;

        localStorage.setItem('user', JSON.stringify(userDetails));

        toast.success('Usuario registrado exitosamente');

        navigate('/');

    } catch (error) {

        console.error('Error en register:', error);

        toast.error('Error inesperado al registrar. Intenta nuevamente.');

    } finally {

        setIsLoading(false);

    }
};

    return { 
        register,
        isLoading
    }
}
