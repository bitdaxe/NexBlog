import React, { useEffect, useState } from "react";
import Link from 'next/link'

import useStore from "../store/useStore";

const Navbar = (): JSX.Element => {

    const isAuth = useStore(state => state.isAuthenticated)
    const logout = useStore(state => state.logout)

    const [user, setUser] = useState<string |null>()

    useEffect(()=>{
        if (localStorage.getItem('user')){
            setUser(localStorage.getItem('user')) 
        }
        console.log(user);
        
    }, [])



    const authneticated = (
        <>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800">
                    <Link className="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent  md:p-0 "  href="/blog/create-post">Make Post</Link>
            </button>
            {/* {user ? <p class>{user}</p> : null} */}
            <button onClick={logout}
            type="button"
            className="text-white  ml-5   focus:ring-4 focus:outline-none border-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0   ">
                    Logout {user ? user : null}
            </button>
        </>
         
    )

    const notAuthenticated = (
        <>
        <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800">
                    <Link className="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent  md:p-0 "  href="/login">Login</Link>
            </button>
            <button
            type="button"
            className="text-white  ml-5   focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 border-2  dark:focus:ring-cyan-800">
                    <Link className="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent  md:p-0 "  href="/register">Register</Link>
            </button>
        </>
    )

    return (
        <nav
            className="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <span
                        className="self-center text-3xl font-mono font-semibold whitespace-nowrap text-white">   <Link className="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent  md:p-0 "  href="/">NextBlog</Link></span>
          
                <div className="flex md:order-2">
                    {isAuth ? authneticated : notAuthenticated}
                </div>
              
            </div>
        </nav>
    )
}

export default Navbar;