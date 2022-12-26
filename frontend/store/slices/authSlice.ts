import {StateCreator} from 'zustand'
import { IAuth } from '../types/IAuth';
import axios from 'axios'
import { API_URL } from '../../config';
import Cookies from 'js-cookie';


const createAuthSlice: StateCreator<IAuth> = (set, get)=>({
    isAuthenticated: false,
    user: {},
    setIsAuth(value){
        set(state => ({...state, isAuthenticated: value}))
    },
    login({username, password}, router) {
        axios.post(`${API_URL}/account/login/` , {username, password}, {withCredentials: true, headers:{
            // 'Access-Control-Allow-Credentials': true,
        }})
        .then(res=>{
            if(res.data.Success === "Login successfully"){
                set(state => ({...state, isAuthenticated: true}))     
                localStorage.setItem('authenticated', 'true')    
    
                
                localStorage.setItem('user', res.data.data)

                router.push('/')
                
                       
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
            localStorage.removeItem('authenticated')
            localStorage.removeItem('user')
        }).catch(er=>{
            console.log(er);
            
        })
     
    },
    register({username, password, email}, router){
        axios.post(`${API_URL}/account/register/` , {username, password, email}, {withCredentials: true, headers:{
            // 'Access-Control-Allow-Credentials': true,
        }})
        .then(res=>{
            console.log(res);
            if(res.status == 201){
                set(state => ({...state, isAuthenticated: true, user: {email: res.data.email, username: res.data.username}}))   
                localStorage.setItem('authenticated', 'true') 
                localStorage.setItem('user', res.data.username) 
                get().login({username, password}, router)
          
            }
            // if(res.data.Success === "Login successfully"){
            //                  
            // }
        })
        .catch(err=>{
            console.log(err);
        }) 
    }
})

export default createAuthSlice;