import axios from "axios";

export const baseURLServer = 'https://api.rajna.space'

const axiosInstance = axios.create({
    baseURL: 'https://api.rajna.space/api',
});

export default axiosInstance