import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { decode } from "querystring";
const jwt = require('jsonwebtoken');
const { verifyAccessToken } = require('../lib/jwt')

export interface CustomRequest extends Request{
    user:JwtPayload
}
const authenticate = (req: Request, res:Response, next: NextFunction) => {
    try{
        const token =  req.header('Authorization')?.replace('Bearer', "")
        if(!token) return res.status(401)
                               .json({
                                    status:201,
                                    message: "Unauthorized user, please log in"
                                })
        const decoded = verifyAccessToken(token);
        (req as CustomRequest).user =  decoded
   
        next()    
    }catch(e){
        res.status(401).json({
              status:401,
              message: "Please try to authenticate again "
        });
    }
    
}