import axios from "axios"

const Auth_Url = {
    AUTH_URL: 'https://fitness-tracker-backend-1-vqav.onrender.com/auth'
}

const createAccount = async (payload) => {
    try {
        const response = await axios.post(`${Auth_Url.AUTH_URL}/create-user`, payload);
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: "An unknown error occurred." };
    }
};
const login = async (payload) => {
    try {
        const response = await axios.post(`${Auth_Url.AUTH_URL}/login`, payload)
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: "An unknown error occurred." };
    }
}

export const AuthServices = {
    createAccount,
    login,
}