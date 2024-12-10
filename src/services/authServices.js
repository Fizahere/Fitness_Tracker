import axios from "axios"
import { jwtDecode } from "jwt-decode";

const Auth_Url = {
    AUTH_URL: 'https://fitness-tracker-backend-1-vqav.onrender.com/auth'
}
export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    return decodedToken?.user?.id;
  };

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
        const response = await axios.post(`${Auth_Url.AUTH_URL}/login`, payload);
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('loginTime', Date.now());
        return response.data;
    } catch (error) {
        throw error.response?.data || { msg: "An unknown error occurred." };
    }
};
const logout = () => {
    setAuthState({ isAuthenticated: false, token: null });
    localStorage.removeItem('token');
};

export const AuthServices = {
    createAccount,
    login,
    logout,
}