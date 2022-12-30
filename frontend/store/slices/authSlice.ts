import {StateCreator} from 'zustand'
import { IAuth, IUser } from '../types/IAuth';
import axios from 'axios'
import { API_URL } from '../../config';
import Cookies from 'js-cookie';


const createAuthSlice: StateCreator<IAuth> = (set, get)=>({
    isAuthenticated: false,
    user: null,
    setIsAuth(value){
        set(state => ({...state, isAuthenticated: value}))
    },
    error: false,
    toggleError(){
        set(state=> ({...state, error: !state.error}))
    },
    loadUser(){
        if(localStorage.getItem('user')){
            let User = JSON.parse(localStorage.getItem('user') || '{}')
            set(state => ({...state, user: User}))
        }
     
    },
    async login({username, password}, router) {
        try{
            const res = await axios.post(`${API_URL}/account/login/` , {username, password}, {withCredentials: true, headers:{
                // 'Access-Control-Allow-Credentials': true,
            }})

            if(res.data.Success === "Login successfully"){
                set(state => ({...state, isAuthenticated: true}))  

                localStorage.setItem('authenticated', 'true')   
                localStorage.setItem('user', JSON.stringify(res.data))

                router.push('/') 
            }



        }catch(err){
            get().toggleError();
            console.log(err);
        }      
    },
    async logout(){
        try{
            const res = await axios.post(`${API_URL}/account/logout/`,{},{withCredentials: true, headers:{
                // 'Access-Control-Allow-Credentials': true,
                'X-CSRFToken': Cookies.get('csrftoken')
            }})

            set(state => ({...state, isAuthenticated: false}))
            localStorage.removeItem('authenticated')
            localStorage.removeItem('user')

        }catch(err){
            console.log(err);            
        }
     
    },
    async register({username, password, email}, router){
        try{
            const res = await axios.post(`${API_URL}/account/register/` , {username, password, email}, {withCredentials: true, headers:{
                // 'Access-Control-Allow-Credentials': true,
            }})

            if(res.status == 201){
                set(state => ({...state, isAuthenticated: true, user: {email: res.data.email, username: res.data.username, id: res.data.id}}))   
                localStorage.setItem('authenticated', 'true') 
                localStorage.setItem('user', JSON.stringify(res.data))
                get().login({username, password}, router)
          
            }
        }catch(err){
            console.log(err);            
        }
    }
})

export default createAuthSlice;