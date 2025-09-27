import jwt from 'jsonwebtoken';

export const generateToken = (userId,res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,//prevent xss attacks:cross site scripting 
        sameSite:"strict",//csrf protection
        secure:process.env.NODE_ENV === "development" ? true : false // set secure flag in production

    });
    return token;
}