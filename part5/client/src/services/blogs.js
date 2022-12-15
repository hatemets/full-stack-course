import axios from "axios"

const baseUrl = "http://localhost:3001/api/blogs"
let token = null

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data).catch(err => {
        console.log(err)
    })
}

const setToken = (token) => {
    token = `bearer ${token}`
}

const create = async (newObj) => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.post(baseUrl, newObj, config)
    return res.data
}

const update = async (id, newObj) => {
    const req = axios.put(`${baseUrl}/${id}`, newObj)
    return req.data
}

const blogService = { getAll, setToken, create, update }

export default blogService
