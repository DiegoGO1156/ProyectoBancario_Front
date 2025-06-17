import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerRequest } from "../../services";
import toast from "react-hot-toast";

export const useRegister = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const register = async (formData) => {
        setIsLoading(true);

        const response = await registerRequest(formData);

        setIsLoading(false);

        if (response.error) {
            const message = response.message || "Ocurrió un error al registrar";
            return toast.error(message);
        }

        toast.success('Usuario registrado. Pendiente de activación.');

        navigate('/login');
    }

    return {
        register,
        isLoading
    };
};
