import axios from "axios";

const postRegister = async (body) => {
    try {
        const { data } = await axios.post('https://api.rajna.space/api/auth/local/register', body)

        return data
    } catch (err) {
        throw err
    }
}

export default postRegister