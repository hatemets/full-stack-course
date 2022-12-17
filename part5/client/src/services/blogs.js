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

const getById = async (id) => {
    try {
        const req = await axios.get(`${baseUrl}/${id}`)
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

const remove = async (id) => {
    const headers = {
        Authorization: token
    }

    const req = axios.delete(`${baseUrl}/${id}`, { headers })
    return req.data
}

const blogService = {
    getAll,
    getById,
    setToken,
    create,
    update,
    remove
}

export default blogService
