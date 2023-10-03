import axios from "axios";

export const makeGetDistrictsRequest = async (id) => {
    try {
        const result = await axios.get(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`)

        return result.data
    } catch(err) {
        return err
    }
}