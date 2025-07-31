import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:3000/BrigadaDigital/v1/',
    timeout: 5000,
    httpAgent: false
});

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("user", "roleUser");
        if(userDetails){
            const token = JSON.parse(userDetails).token;
            config.headers.Authorization = token;
        }
        return config;
    },
    (e) => {
        return Promise.reject(e);
    }
);

export const getComplaints = async () => {
  try {
    return await apiClient.get('/complaints/getComplaints');
  } catch (e) {
    return {
      error: true,
      e
    };
  }
};

export const approveComplaint = async (id, feedback = "") => {
  try {
    return await apiClient.put(`/complaints/manageRequestsOfUser/true/${id}`, { feedback });
  } catch (e) {
    return {
      error: true,
      e
    };
  }
};

export const rejectComplaint = async (id, feedback = "") => {
  try {
    return await apiClient.put(`/complaints/manageRequestsOfUser/false/${id}`, { feedback });
  } catch (e) {
    return {
      error: true,
      e
    };
  }
};
