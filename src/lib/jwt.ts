import { Jwt } from "jsonwebtoken";
import mongoose from "mongoose";
const jwt = require('jsonwebtoken');
require('dotenv').config()
type TokenPayload = {
    user:{
        userId: mongoose.ObjectId
    }
}
const generateAccessToken = (value:TokenPayload) => {
    return jwt.sign( value, `${process.env.JWT_STRONG_SECRET}`,{ expiresIn:'1 days'})
}
function generateRefreshToken(value:TokenPayload) {
     return jwt.sign(value, `${process.env.REFRESH_TOKEN_SECRET}`, { expiresIn: '1y' });
}

function verifyAccessToken(token: string){
     return jwt.verify(token, `${process.env.JWT_STRONG_SECRET}`)
}




module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken
}