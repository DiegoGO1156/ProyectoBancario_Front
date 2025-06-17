import axios from "axios";
import { logout } from "../shared/hooks";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/Valmeria_App/V1',
    timeout: 5000
})

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails = localStorage.getItem('user')

        if(useUserDetails){
            const token = JSON.parse(useUserDetails).token
            config.headers.Authorization = token
        }

        return config;
    },
    (e) => {
        return Promise.reject(e)
    }
)

export const login = async (data) => {
    try {
        const response = await apiClient.post('/auth/login', data);
        if(response.data.userDetails) {
            localStorage.setItem("user", JSON.stringify(response.data.userDetails));
            localStorage.setItem("roleUser", response.data.userDetails.role)
        }
        return response;
    } catch (e) {
        return {
            error: true,
            message: e.response?.data?.msg || "Error al iniciar sesión",
            e
        };
    }
};

export const register = async(data) => {
    try {
        return await apiClient.post('/Auth/register', data)
        return { data: response.data };
    } catch (e) {
        return{
            error: true,
            message: e.response?.data?.msg || e.message || "Error desconocido",
            e
        }
    }
}

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