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

export const updateUser = async (data) => {
  try {
    const response = await apiClient.put('/User/updateData', data);
    return response.data;
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.error || e.message || "Error al editar el perfil",
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
        const response = await apiClient.put('/User/updatePassword', data)
        return response.data;
    } catch (e) {
      console.log(e)
        return {
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

export const addTransfer = async (data) => {
  try {
    const response = await apiClient.post("/transfers/make-transfer", data);
    return response.data;
  } catch (e) {
    console.log(e)
    return {
      error: true,
      message: e.response?.data?.message || "No se pudo hacer la transferencia",
      e,
    };
  }
};


export const getTransferByUser = async (id) => {
  try {
    const response = await apiClient.get(`/transfers/get-user/${id}`);
    return response.data;
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.message || "No se pudieron obtener las transferencias del usuario",
      e,
    };
  }
};


export const getAllTransfers = async () => {
  try {
    const response = await apiClient.get("/transfers/get/");
    return response.data;
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.message || "No se pudieron obtener las transferencias",
      e,
    };
  }
};

export const listUserTransfered = async () => {
  try {
    const response = await apiClient.get("/transfers/get-user-transfered/");
    return response.data;
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.message || "No se pudo obtener la lista de usuarios transferidos",
      e,
    };
  }
};

export const makeAUserFavorite = async (number, alias) => {
  try {
    const response = await apiClient.put('/transfers/favorite', {
      number,
      alias
    });
    return response.data;
  } catch (e) {
    console.log(e)
    return {
      error: true,
      message: e.response?.data?.message || "No se pudo agregar a favoritos",
      e,
    };
  }
};

export const getFavorites = async () => {
    try {
        const response = await apiClient.get('/transfers/favorites');
        return response.data;
    } catch (e) {
        return{
            error: true,
            e: e.response?.data?.error || e.message
        };
    }
};

export const getProducts = async (limite = 10, desde = 0) => {
  try {
    const response = await apiClient.get(`/Products/allProducts?limite=${limite}&desde=${desde}`);
    return response.data;

  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.message || "No se pudieron obtener los productos",
      e,
    };
  }
};

export const productBuy = async (productId) => {
  try {
    const response = await apiClient.post(`transfers/buy-product/${productId}`);
    return response.data; 

  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.message || "No se pudieron obtener los productos",
      e,
    };
  }
};

export const getServices = async () => {
  try {
    const response = await apiClient.get("/Services/allServices");
    return response.data;
  } catch (e) {
    console.error("Error en getServices:", e);
    return {
      error: true,
      message: e.response?.data?.msg || "No se pudieron obtener los servicios",
      e,
    };
  }
};  

export const payService = async (serviceId, amount = 0) => {
  try {
    const response = await apiClient.post(
      `/transfers/pay-service/${serviceId}`,
      { amount }
    );

    const { message, transfer } = response.data;
    alert(`${message}\nMonto pagado: $${transfer.amount}`);

    return { success: true, newBalance: transfer.amount };
  } catch (e) {
    alert(e.response?.data?.message || "Error al pagar el servicio");
    return { success: false };
  }
};