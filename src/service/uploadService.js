import axiosInstance from "./axiosInstance";

const uploadService = async (imageFile) => {
    axiosInstance.defaults.headers.common['Authorization'] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjkzOTQwNDY4LCJleHAiOjE2OTY1MzI0Njh9.xR9NqH8eW1LpXtzrv991pXchN3WRb3mf5DZprQHAH0I";

    const formData = new FormData()
    formData.append('files', imageFile[0])
    const result = await axiosInstance.post('/upload', formData)
    
    return result
}

export default uploadService