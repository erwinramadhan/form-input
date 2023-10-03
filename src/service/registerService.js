import axios from "axios";

const postRegister = async (body) => {
    const { data } = await axios.post('https://api.rajna.space/api/auth/local/register', body)

    return data
}

export default postRegister