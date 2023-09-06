import axios from "axios"

const loginService = async (identifier, password) => {
    const result = await axios.post('http://103.175.219.0:1337/api/auth/local', {
        identifier,
        password
    })

    return result
}

export default loginService