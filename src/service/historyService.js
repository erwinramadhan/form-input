import axiosInstance from "./axiosInstance";

const historyService = async () => {
    axiosInstance.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzOTQyMTcwLCJleHAiOjE2OTY1MzQxNzB9.wO3wYKz-IkvxI_GfBR_BPmuWVIFrAnF2QrB53UNvpSM";

    const user = localStorage.getItem('user')
    const parsedItem = JSON.parse(user);
    const userNameSurveyor = parsedItem.username
    const result = await axiosInstance.get(`/surveys?filters[surveyor_username][$eq]=${userNameSurveyor}&populate=*`)
    
    return result
}

export default historyService