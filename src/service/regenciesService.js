import axios from "axios";

export const makeGetRegenciesRequest = async () => {
    try {
        const result = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/regencies/34.json')

        return result.data
    } catch(err) {
        return err
    }
}