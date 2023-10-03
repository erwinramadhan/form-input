import axiosInstance from "./axiosInstance";

const formService = async (data) => {
    const unParsedToken = localStorage.getItem('token')
    const token = JSON.parse(unParsedToken)

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const result = await axiosInstance.post('/voters', data)
    
    return result
}

export const formDetailService = async (id) => {
    const unParsedToken = localStorage.getItem('token')
    const token = JSON.parse(unParsedToken)

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const user = localStorage.getItem('user')
    const parsedItem = JSON.parse(user);
    const userId = parsedItem.id
    const result = await axiosInstance.get(`/voters/${id}?filters[users_permissions_user]=${userId}&populate=*`)
    
    return result
}

export const deleteFormService = async (id) => {
    const unParsedToken = localStorage.getItem('token')
    const token = JSON.parse(unParsedToken)

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const result = await axiosInstance.delete(`/voters/${id}`)
    
    return result
}

export const editFormService =  async (id, data) => {
    const unParsedToken = localStorage.getItem('token')
    const token = JSON.parse(unParsedToken)

    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const result = await axiosInstance.put(`/voters/${id}`, data)

    return result
}

export default formService