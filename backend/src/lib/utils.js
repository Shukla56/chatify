import jwt from 'jsonwebtoken';
import { ENV } from './env.js';

export const generateToken = (userId,res) => {
    const{JWT_SECRET} = ENV;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not configured")
    }

    const token = jwt.sign({  userId }, JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,//prevent xss attacks:cross site scripting 
        sameSite:"strict",//csrf protection
        secure:ENV.NODE_ENV === "development" ? true : false // set secure flag in production

    });
    return token;
}