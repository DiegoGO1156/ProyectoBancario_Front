import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from '../../services'
import toast from "react-hot-toast";

export const useLogin = () => {

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const login = async (email, password) => {

        setIsLoading(true);

        //console.log("login() - datos enviados:", { email, password });

        const response = await loginRequest({ email, password });

        //console.log("login() - respuesta recibida:", response);

        setIsLoading(false);

        //console.log(response)

        if (response.error) {
            const status = response.e?.response?.status;

            if (status === 401 || response.message === 'Falta validar la cuenta.') {
                return toast.error('Tu cuenta aún no ha sido validada. Revisa tu correo o contacta al administrador.');
            }

            return toast.error(
                response.message ||
                response.e?.response?.data?.msg ||
                response.e?.response?.data?.error ||
                'Tu cuenta aún no ha sido validada. Revisa tu correo o contacta al administrador.' ||
                'Ocurrió un error al iniciar sesión'
            );
        }

        const { userDetails } = response.data

        localStorage.setItem('user', JSON.stringify(userDetails));

        toast.success('Sesion iniciada correctamente')

        const role = localStorage.getItem("roleUser")

        if(role === "ADMIN"){
            navigate('/admin')
        }else if(role === "USER"){
            navigate('/DashboardUser')
        }else{
            navigate('/')
        }

    }

    return {
        login,
        isLoading,
    }
}