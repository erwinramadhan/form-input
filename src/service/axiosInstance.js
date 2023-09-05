import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://103.175.219.0:1337/api',
    headers: {
        'Access-Control-Allow-Origin': 'http://103.175.219.0:1337',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
      },
});

export default axiosInstance