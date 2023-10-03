import axios from "axios";

const getAllTeams = async () => {
    const { data } = await axios.get('https://api.rajna.space/api/teams')

    return data
}

export default getAllTeams