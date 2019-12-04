import axios from 'axios'

export const createUser = (userId, name) => axios.post(`${process.env.SERVER_BASE_URL}/users`, { userId, name })

export const getUsers = () => axios.get(`${process.env.SERVER_BASE_URL}/users`)
