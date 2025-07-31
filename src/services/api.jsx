import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:3000/BrigadaDigital/v1/',
    timeout: 5000
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem('user');
    if (userDetails) {
      try {
        const parsed = JSON.parse(userDetails);
        if (parsed?.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`; 
        }
      } catch (error) {
        console.error(error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export const login = async (data) => {
  try {
    const response = await apiClient.post('Auth/login', data);
    
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

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getComplaints = async () => {
    try {
        const response = await apiClient.get(`/complaints/getComplaints`);
        return response.data;
    } catch (e) {
        console.log(e)
        return {
            error: true,
            e
        };
    }
};

export const addComplaints = async (data) => {
    try {
        const response = await apiClient.post(`/complaints/createComplaint`, data);
        return response.data;
    } catch (e) {
        console.log("Error del backend:", e.response?.data);
        return {
            error: true,
            e
        };
    }
};

export const addComplaintsAnonymous = async (data) => {
    try {
        const response = await apiClient.post(`/complaints/createComplaintAnonymous`, data);
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const getCategories = async () => {
    try {
        const response = await apiClient.get(`/categories/allCategories`);
        return response.data.categories;
    } catch (e) {
        console.log(e)
        return {
            error: true,
            e
        };
    }
};
