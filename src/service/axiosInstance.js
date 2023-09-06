import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://103.175.219.0:1337/api',
});

export default axiosInstance