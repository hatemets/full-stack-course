import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = () => axios.get(baseUrl) 

const add = newPerson => axios.post(baseUrl, newPerson)

const update = (id, newPerson) => axios.put(`${baseUrl}/${id}`, newPerson)

const remove = id => axios.delete(`${baseUrl}/${id}`)

const server = {
    getAll,
    add,
    update,
    remove
}

export default server
