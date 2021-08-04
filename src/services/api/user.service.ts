import axios, { AxiosResponse } from "axios";
import { config } from "../core/config";

function getUser () {
    try {
        return axios.get(`/users/me`)
    } catch(e) {
       return Promise.reject(e)
    }
    
}


export {
    getUser
}


