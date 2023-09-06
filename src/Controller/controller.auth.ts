import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../Middleware/middleware.auth";
const userHelper = require('../helpers/user.helper');
const { generateAccessToken, generateRefreshToken } = require('../lib/jwt')
const UserModel = require('../Model/model.user')
module.exports = {
     register: async (req:Request, res:Response , next: NextFunction) => {
           const { password, email } = req.body;
           console.log(req.body)
           try{
                const isUserExist = await userHelper.getUserByEmail(email);
                if(isUserExist) return res.status(401)
                                          .json({
                                               status:401,
                                               message:"Email already in use" 
                                          })
                const user = await userHelper.createUser(email, password)
               //  console.log(user)
                res.status(201).json({
                    status:201,
                    message:"User registred successfully",
                    userEmail: user._doc.email
                })
           }catch(e: any){
               res.status(500).json({
                   status:500,
                    message:"Internal server error",
                    info:e.message,
               })
           }
     },
     login: async (req: Request, res: Response, next: NextFunction) => {
            const { email, password } = req.body;
            const _password = password
            try{
                 const user = await userHelper.getUserByEmail(email);
                 if(!user) return res.status(403)
                                     .json({
                                          status:401,
                                          message:"Failed to log in, Pair email/password not correct" 
                                     })
                const isValid = await user.comparePassword(_password);
                if(!isValid) return  res.status(403)
                                        .json({
                                             status:401,
                                             message:"Failed to log in, Pair email/password not correct" 
                                  })  
                const { password, ...authenticatedUser} = user._doc  
                res.status(201).json({
                     status:201,
                     message:"You are Successfully logged in",
                     data: authenticatedUser,
                     token:  generateAccessToken({user: { userId: user._doc._id}}),
                     refreshToken:  generateRefreshToken({user: { userId: user._doc._id}})
                })
            }catch(e: any){
               res.status(500).json({
                    status:500,
                    message:"Internal server error",
                    info:e.message,
                     
                })
            }
     },
     logout: async (req: Request, res:Response, next:NextFunction) => {
           const { userId } = (req as CustomRequest).user;
           try{
               await UserModel.findOneAndUpdate({_id:userId }, { lastActivity: Date.now()})
           }catch(e: any){
               res.status(500).json({
                    status:500,
                    message:"Internal server error",
                    info:e.message,
                     
                })
           }
     },
     verifyAccount: (req: Request, res: Response, next: NextFunction) => {
           //Todo: Implement account verification  
     },
     resetPassword: (req: Request, res: Response, next: NextFunction) => {
          //Todo: Implement  reset password 
     },
     setNewPassword: (req: Request, res: Response, next: NextFunction) => {
          //Todo: Implement setting new password   
     },
     

}