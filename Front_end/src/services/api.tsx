import axios from "axios";
import { getToken } from "./auth";


const api = axios.create({
  baseURL: 'http://localhost:3000' 
});

//Intercepta a requisição para acrecentar o Token. 
api.interceptors.request.use(async config => { 

  const token = getToken();
  // DEBUG CODE:
  // alert(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;