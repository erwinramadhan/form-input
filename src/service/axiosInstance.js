import axios from "axios";

export const baseURLServer = 'http://103.175.219.0:1337'

const axiosInstance = axios.create({
    baseURL: 'http://103.175.219.0:1337/api',
});

export default axiosInstance