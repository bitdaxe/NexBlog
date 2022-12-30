import {StateCreator} from 'zustand'
import { IBlog } from '../types/IBlog';
import axios from 'axios'
import { API_URL } from '../../config';
import Cookies from 'js-cookie';


const createBlogSlice: StateCreator<IBlog> = (set)=>({
    blogs:[],
    async loadBlogs(){
        try {

            const res = await axios.get(`${API_URL}/api/blogs/`, {withCredentials: true, headers:{
               
            }})
            
            set(state => ({...state, blogs: res.data}))
            console.log(res);      

        } catch (error) {
            console.log(error);
        }
    }
})

export default createBlogSlice;