import axios from 'axios';
import store from '../features';
import { useSelector } from "react-redux";

const user = useSelector((state) => state.user.value);

const axiosApiInstance = axios.create({
  baseURL: 'https://1793-2a01-cb19-121-7900-a1bf-5161-4b0c-75f6.ngrok.io/',
});
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    console.log("user", user)
    if (user.isAuthenticated) {
      config.headers = {
        Authorization: `Bearer ${user.token}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

export default axiosApiInstance;