import axios from 'axios';
import store from '../features';
import { useSelector } from "react-redux";

const user = useSelector((state) => state.user.value);

const ngrokUrl: string = "https://5f07-2a01-e0a-1d1-8260-90c9-71e8-e3ea-9c84.eu.ngrok.io"

const axiosApiInstance = axios.create({
  baseURL: 'https://4bc6-2a01-e0a-1d1-8260-6593-564-4d0f-ad45.eu.ngrok.io',
});
// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
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