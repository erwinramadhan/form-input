import axiosInstance from "./axiosInstance";

const uploadService = async (imageFile) => {
    const unParsedToken = localStorage.getItem('token')
    const token = JSON.parse(unParsedToken)

    console.log('unParsedToken', unParsedToken)
    console.log('token', token)

    if (token === null) {
        delete axiosInstance.defaults.headers.common
    } else {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    const formData = new FormData()
    formData.append('files', imageFile[0])
    const result = await axiosInstance.post('/upload', formData)
    
    return result
}

export default uploadService