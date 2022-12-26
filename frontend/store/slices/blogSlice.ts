import {StateCreator} from 'zustand'
import { IBlog } from '../types/IBlog';
import axios from 'axios'
import { API_URL } from '../../config';
import Cookies from 'js-cookie';


const createBlogSlice: StateCreator<IBlog> = (set)=>({
    blogs:[],
    loadBlogs(){
        axios.get(`${API_URL}/api/blogs/`, {withCredentials: true})
        .then(res=>{
            // console.log(res.data);
            set(state => ({...state, blogs: res.data}))
        })
        .catch(err=>{
            console.log(err);
            
        })
    }
})

export default createBlogSlice;