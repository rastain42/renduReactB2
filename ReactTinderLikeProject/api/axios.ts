import axios from 'axios';
import store from '../features';
import { useSelector } from "react-redux";

const user = useSelector((state) => state.user.value);

const axiosApiInstance = axios.create({
  baseURL: 'https://8ec2-77-196-149-138.eu.ngrok.io/',
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