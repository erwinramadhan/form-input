import axiosInstance from "./axiosInstance";

const formService = async (data) => {
    const unParsedToken = localStorage.getItem('token')
    const token = JSON.parse(unParsedToken)

    console.log('unParsedToken', unParsedToken)
    console.log('token', token)
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const result = await axiosInstance.post('/surveys', data)
    
    return result
}

export default formService