import axios from "axios"

const loginService = async (identifier, password) => {
    const result = await axios.post('https://api.rajna.space/api/auth/local', {
        identifier,
        password
    })

    return result
}

export default loginService