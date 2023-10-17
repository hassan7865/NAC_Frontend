import axios from 'axios'
const BASE_URL = "http://localhost:8800/api"
const User = JSON.parse(localStorage.getItem("persist:root"))?.current
const token = User && JSON.parse(User)?.token
console.log(token)
export const Req = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${token}`}
})