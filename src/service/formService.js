import axiosInstance from "./axiosInstance";

const formService = async (data) => {
    const unParsedToken = localStorage.getItem('token')
    const token = JSON.parse(unParsedToken)

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const result = await axiosInstance.post('/surveys', data)
    
    return result
}

export const formDetailService = async (id) => {
    const unParsedToken = localStorage.getItem('token')
    const token = JSON.parse(unParsedToken)

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const user = localStorage.getItem('user')
    const parsedItem = JSON.parse(user);
    const userNameSurveyor = parsedItem.username
    const result = await axiosInstance.get(`/surveys/${id}?filters[surveyor_username][$eq]=${userNameSurveyor}&populate=*`)
    
    return result
}

export const deleteFormService = async (id) => {
    const unParsedToken = localStorage.getItem('token')
    const token = JSON.parse(unParsedToken)

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const result = await axiosInstance.delete(`/surveys/${id}`)
    
    return result
}

export const editFormService =  async (id, data) => {
    const unParsedToken = localStorage.getItem('token')
    const token = JSON.parse(unParsedToken)

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const result = await axiosInstance.put(`/surveys/${id}`, data)

    return result
}

export default formService