import axios from "axios";
import { logout } from "../shared/hooks";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/Valmeria_App/V1',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if (useUserDetails && useUserDetails !== "undefined") {
            try {
                const parsed = JSON.parse(useUserDetails);
                if (parsed?.token) {
                    config.headers.Authorization = parsed.token;
                }
            } catch (error) {
                console.error("Token inválido en localStorage:", error);
            }
        }

        return config;
    },
    (e) => Promise.reject(e)
);

export const login = async (data) => {
    try {
        const response = await apiClient.post('/Auth/login', data);

        const userDetails = response.data?.userDetails;

        if (userDetails && userDetails.token) {
            localStorage.setItem("user", JSON.stringify(userDetails));
            localStorage.setItem("roleUser", userDetails.role);
        } else {
            throw new Error("Datos de usuario incompletos o token no recibido");
        }

        return {
            data: response.data,
            error: false,
        };

    } catch (e) {
        return {
            error: true,
            message: e.response?.data?.msg || e.message || "Error al iniciar sesión",
            e,
        };
    }
};

export const register = async (data) => {
    try {
        const response = await apiClient.post('/Auth/register', data);
        return {
            error: false,
            data: response.data,
            message: response.data.msg || "Registro exitoso"
        };
    } catch (e) {
        return {
            error: true,
            message: e.response?.data?.error || e.message || "Error desconocido",
            e
        };
    }
};

export const getUserProfile = async () => {
    try {
        const response = await apiClient.get('User/personalData')
        return response.data.listData
    } catch (e) {
        if (e.response?.status === 401) {
            logout()
        }
        return {
            error: true,
            message: e.response?.data?.msg || "No se pudo obtener el perfil"
        }
    }
}

export const changePassword = async (data) => {
    try {
        return await apiClient.patch('/User/updatePassword', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}