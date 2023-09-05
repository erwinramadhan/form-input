import axiosInstance from "./axiosInstance";

const loginService = async (identifier, password) => {
    const result = await axiosInstance.post('/auth/local', {
        identifier,
        password
    })

    return result
}

export default loginService