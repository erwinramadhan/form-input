import axiosInstance from "./axiosInstance";

const historyService = async () => {
    const unParsedToken = localStorage.getItem('token')
    const token = JSON.parse(unParsedToken)

    console.log('unParsedToken', unParsedToken)
    console.log('token', token)
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const user = localStorage.getItem('user')
    const parsedItem = JSON.parse(user);
    const userNameSurveyor = parsedItem.username
    const result = await axiosInstance.get(`/surveys?filters[surveyor_username][$eq]=${userNameSurveyor}&populate=*`)
    
    return result
}

export default historyService