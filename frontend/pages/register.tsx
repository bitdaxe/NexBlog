import React, { FC, useState } from "react";
import axios from 'axios'
import { API_URL } from "../config";
import useStore from "../store/useStore";
import Navbar from "../components/navbar";
import { useRouter } from "next/router";

const RegisterPage: FC = (): JSX.Element => {
    const [form, setForm] = useState({ username: '', password: '', confirmpassword:'', email: '' });
    const register = useStore(state => state.register)
    const isAuth = useStore(state => state.isAuthenticated)
    const router = useRouter()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void =>{
        e.preventDefault();
        
        console.log(isAuth);
        if(form.username !== '' && form.password !== '' && form.email !== '' && form.password === form.confirmpassword){
            // register the user
            register({username: form.username,password: form.password, email: form.email}, router)
        }
    }

    const handleChange = (event:any) => {
        const name = event.target.name;
        
        const value = event.target.value;
        setForm({ ...form, [name]: value });
      };
    

    return(
        <>
            <Navbar/>

            <div className="container mx-auto xl:px-44 mt-32 mb-32">
            
            <form onSubmit={handleSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-slate-700 text-white">
            <h1 className='text-center text-4xl font-mono'>NextBlog Register</h1>
            <div className="mb-4 ">
                <label className="block  text-sm font-bold mb-2" htmlFor="username">
                Username
                </label>
                <input name='username' onChange={ handleChange} className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Enter Username"/>
            </div>
            <div className="mb-4 ">
                <label className="block  text-sm font-bold mb-2" htmlFor="email">
                Email
                </label>
                <input name='email' onChange={ handleChange} className="text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Enter Username"/>
            </div>
            <div className="">
                <label className="block  text-sm font-bold mb-2" htmlFor="password">
                Password
                </label>
                <input name='password' onChange={ handleChange} className="text-black shadow appearance-none border rounded w-full py-2 px-3  mb-3 " id="password" type="password" placeholder="******************"/>
            </div>
            <div className="mb-6">
                <label className="block  text-sm font-bold mb-2" htmlFor="cpassword">
                Confirm Password
                </label>
                <input name='confirmpassword' onChange={handleChange} className="text-black shadow appearance-none border rounded w-full py-2 px-3  mb-3 " id="cpassword" type="password" placeholder="******************"/>
            </div>
            <div className="flex items-center justify-between">
                <input className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value='Register'/>
                
               
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
                </a>
            </div>
            </form>

        </div>
        </>
       
    )
}

export default RegisterPage;