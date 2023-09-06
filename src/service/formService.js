import axiosInstance from "./axiosInstance";

const formService = async (data) => {
    axiosInstance.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzOTQyMTcwLCJleHAiOjE2OTY1MzQxNzB9.wO3wYKz-IkvxI_GfBR_BPmuWVIFrAnF2QrB53UNvpSM";

    const result = await axiosInstance.post('/surveys', data)
    
    return result
}

export default formService