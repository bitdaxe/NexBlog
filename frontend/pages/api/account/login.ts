import cookie from 'cookie'
import {API_URL} from '../../../config/index'
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios'

const login = async  (req: NextApiRequest,res: NextApiResponse)=>{
    if(req.method == "POST"){
        const {username, password} = req.body;
        console.log(username, password);
        
        const body = JSON.stringify({username, password})
        console.log(API_URL);
        
        try{

            // axios.post(`${API_URL}/`)
            const apiRes = await fetch(`${API_URL}/account/api/token/`, {
                method : "POST",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })

            const data = await apiRes.json();



            console.log(process.env.NODE_ENV === "development");
             
            if(apiRes.status === 200){
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', data.access, {
                             httpOnly: true,
                             secure: process.env.NODE_ENV === "development" ? false : true,
                             maxAge: 30 * 60,
                             sameSite: 'strict',
                             path:'/'
                        }
                    ),
                    cookie.serialize(
                        'refresh', data.refresh, {
                             httpOnly: true,
                             secure: process.env.NODE_ENV === "development" ? false : true,
                             maxAge: 60 * 60 * 24,
                             sameSite: 'strict',
                             path:'/'
                        }
                    )
                ])

                return res.status(200).json({
                    success: "Succesfully Logged In!"
                })
            }else{
                return res.status(apiRes.status).json({
                    error: 'Login Failed'
                })
            }
        }catch{
            return res.status(500).json({
                error: 'Something went wrong!'
            })
        }
    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: 'Not Allowed'})
    }
    
}

export default login;