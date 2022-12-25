import React, { useEffect } from "react"
import axios from "axios"
import { API_URL } from "../config"
import Cookies from 'js-cookie';

const LogOut = (): JSX.Element => {
    useEffect(()=>{
        console.log(Cookies.get('csrftoken'));
        
        axios.post(`${API_URL}/account/logout/`,{},{withCredentials: true, headers:{
            // 'Access-Control-Allow-Credentials': true,
            'X-CSRFToken': Cookies.get('csrftoken')
        }})
        .then(res=>{
            console.log(res);
            
        }).catch(er=>{
            console.log(er);
            
        })

    },[])
    return (
        <div>

        </div>
    )
}

export default LogOut;