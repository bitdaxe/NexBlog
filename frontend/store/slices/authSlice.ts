import {StateCreator} from 'zustand'
import { IAuth } from '../types/IAuth';
import axios from 'axios'
import { API_URL } from '../../config';
import Cookies from 'js-cookie';


const createAuthSlice: StateCreator<IAuth> = (set)=>({
    isAuthenticated: false,
    login({username, password}) {
        axios.post(`${API_URL}/account/login/` , {username, password}, {withCredentials: true, headers:{
            // 'Access-Control-Allow-Credentials': true,
        }})
        .then(res=>{
            if(res.data.Success === "Login successfully"){
                set(state => ({...state, isAuthenticated: true}))                
            }
        })
        .catch(err=>{
        })
      
    },
    logout(){
        axios.post(`${API_URL}/account/logout/`,{},{withCredentials: true, headers:{
            // 'Access-Control-Allow-Credentials': true,
            'X-CSRFToken': Cookies.get('csrftoken')
        }})
        .then(res=>{
            set(state => ({...state, isAuthenticated: false}))
            
        }).catch(er=>{
            console.log(er);
            
        })
     
    }
})

export default createAuthSlice;