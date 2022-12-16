import axios from "axios"

const baseUrl = "http://localhost:3001/api/blogs"
let token = null

const getAll = async () => {
    try {
        const req = await axios.get(baseUrl)
        return req.data
    }
    catch (err) {
        console.error(err)
    }
}

const setToken = (rawToken) => {
    token = `bearer ${rawToken}`
}

const create = async (newObj) => {
    const headers = {
        Authorization: token
    }

    const res = await axios.post(baseUrl, newObj, { headers })
    return res.data
}

const update = async (id, newObj) => {
    const req = axios.put(`${baseUrl}/${id}`, newObj)
    return req.data
}

const blogService = { getAll, setToken, create, update }

export default blogService
