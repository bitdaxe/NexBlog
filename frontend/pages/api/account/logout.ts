import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const logout = async (req: NextApiRequest,res: NextApiResponse)=>{
    if(req.method == "POST"){
        res.setHeader('Set-Cookie', [
            cookie.serialize(
                'access', '', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "development" ? false : true,
                        expires: new Date(0),
                        sameSite: 'strict'
                }
            ),
            cookie.serialize(
                'access', '', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === "development" ? false : true,
                        expires: new Date(0),
                        sameSite: 'strict'
                }
            )])

            return res.status(200).json({
                success: "Succesfully Logged Out!"
            })

    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: 'Not Allowed'})
    }
}

export default logout;