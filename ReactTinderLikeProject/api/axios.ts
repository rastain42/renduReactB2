import axios from 'axios';
import { useSelector } from "react-redux";

const user = useSelector((state) => state.user.value);

const axiosApiInstance = axios.create({
  baseURL: process.env.NGROK_FORWARD_URL,
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