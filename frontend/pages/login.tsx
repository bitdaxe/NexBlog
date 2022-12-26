import React, { FC, useState } from "react";
import axios from 'axios'
import { API_URL } from "../config";
import useStore from "../store/useStore";
import Navbar from "../components/navbar";
import { useRouter } from 'next/router'
const LoginPage: FC = (): JSX.Element => {
    const router = useRouter()
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const login = useStore(state => state.login)
    const isAuth = useStore(state => state.isAuthenticated)
 
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void =>{
        e.preventDefault();
        login({username, password}, router)
        console.log(isAuth);
     
        
    }

    return(
        <>
            <Navbar/>

            <div className="container mx-auto xl:px-44 mt-32">
            
            <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-slate-700 text-white">
            <h1 className='text-center text-4xl font-mono'>NexBlog Login</h1>
            <div className="mb-4 ">
                <label className="block  text-sm font-bold mb-2" htmlFor="username">
                Username
                </label>
                <input onChange={e=> setUsername(e.currentTarget.value)} className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Username"/>
            </div>
            <div className="mb-6">
                <label className="block  text-sm font-bold mb-2" htmlFor="password">
                Password
                </label>
                <input onChange={e => setPassword(e.currentTarget.value)} className="text-black shadow appearance-none border rounded w-full py-2 px-3  mb-3 " id="password" type="password" placeholder="******************"/>
            </div>
            <div className="flex items-center justify-between">
                <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value='Login'/>
                
               
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
                </a>
            </div>
            </form>

        </div>
        </>
       
    )
}

export default LoginPage;