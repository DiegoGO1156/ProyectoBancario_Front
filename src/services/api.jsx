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
    } catch (e) {
        return{
            error: true,
            e
        }
    }
};

export const getBrands = async () => {
    try {
        const response = await apiClient.get('/Brands/allBrands');
        return response.data;
    } catch (e) {
        return{
            error: true,
            e: e.response?.data?.error || e.message
        };
    }
};

export const createBrand = async (brandData) => {
    try {
        const response = await apiClient.post('/Brands/createBrand', brandData);
        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response?.data?.error || e.message,
        };
    }
}

export const updateBrand = async (id, brandData) => {
    try {
       const response = await apiClient.put(`/Brands/updateBrand/${id}`, brandData);
       return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response?.data?.error || e.message,
        };
    } 
}

export const searchBrandById = async (id) => {
  try {
    const response = await apiClient.get(`/Brands/findBrand/${id}`);
    return response.data;
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.error || e.message,
    };
  }
}; 

export const deleteBrand = async (id) => {
  try {
    const response = await apiClient.delete(`/Brands/deleteBrand/${id}`);
    return response.data;
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.error || e.message,
    };
  }
};

