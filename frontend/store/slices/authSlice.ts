import {StateCreator} from 'zustand'
import { IAuth } from '../types/IAuth';
import axios from 'axios'
import { API_URL } from '../../config';

const loginAPICall = ({username, password}: {username: string, password: string}) =>{
    if(username != '' && password != ''){
        axios.post(`${API_URL}/account/login/` , {username, password}, {withCredentials: true, headers:{
            // 'Access-Control-Allow-Credentials': true,
        }})
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}

const createAuthSlice: StateCreator<IAuth> = (set)=>({
    isAuthenticated: false,
    login({username, password}) {
        loginAPICall({username, password})
    },
})

export default createAuthSlice;