import { BASE_API_URL } from 'config';
import axios from 'axios';

const axiosInstance = axios.create({
  responseType: 'json',
});

axiosInstance.defaults.baseURL = BASE_API_URL;
export default axiosInstance;
