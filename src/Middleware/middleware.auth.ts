import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { verifyAccessToken } = require('../lib/jwt')

export interface CustomRequest extends Request{
    user:JwtPayload | any
}
const authenticate = async (req: CustomRequest, res:Response, next: NextFunction) => {
    try{
        const token =  req.header('Authorization')?.replace('Bearer', " ")
        console.log(token)
        if(!token) return res.status(401)
                               .json({
                                    status:201,
                                    message: "Unauthorized user, please log in"
                                })
        const decoded = verifyAccessToken(token.trim());
        // (req as CustomRequest).user =  decoded
        req.user = decoded.user
      
   
        return next()    
    }catch(e: any){
        res.status(500).json({
              status:'failed',
              message: "Internal server error ",
              info: e.message
        });
    }
    
}

module.exports = {
     authenticate
}