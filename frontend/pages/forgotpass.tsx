import React, { useState } from 'react'
import Navbar from '../components/navbar';

const ForgotPasswordPage: React.FC = ():JSX.Element =>{

    const [email, setEmail] = useState<string>("");

    return(
        <>
            <Navbar/>

            <style jsx>{`
                input.forgot-pass-email{
                    background: #1e293b;
                }
            `}</style>

            <div className='container p-96'>
                <h4 className='text-white font-semibold'>Please enter your email in the box bellow to reset your password.</h4>
                <input placeholder='enter your email here' className="text-black mt-4 forgot-pass-email shadow appearance-none border rounded w-full py-2 px-3  mb-3 " type="text" value={email} onChange={e=> setEmail(e.target.value)}/>
                
                <input className="bg-gray-500 cursor-pointer w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value='Continue'/>
            </div>
        </>
    )
}

export default ForgotPasswordPage;