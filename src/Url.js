import axios from 'axios';

const BASE_URL = "https://nac-backend.vercel.app/api";
// const BASE_URL = "http://localhost:8000/api"

const userJSON = localStorage.getItem("persist:root");
const User = userJSON && JSON.parse(userJSON)?.current
export const token = User && JSON.parse(User)?.token 

export const Req = axios.create({
    baseURL: BASE_URL,
    headers: {token:`Bearer ${token}`},
    
});
