import axios from "axios"

const baseUrl = "/api/blogs"

export const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}
