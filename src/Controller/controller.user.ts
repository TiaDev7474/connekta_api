import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../Middleware/middleware.auth";
const { uploadFile , getFileUrl} = require('../Services/firebase-storage');
const UserModel = require('../Model/model.user');
   
const { getFriendSuggestion } = require('../helpers/friendship.helper')
module.exports = {
    updateProfilePicture: async  (req:CustomRequest, res:Response , next:NextFunction) => {
          const { userId } = req.user;
          try{
               if(!req.file || req.file.size < 0) return res.status(200).json({
                                                                            status:"failed",
                                                                             message:"The file is may be corrupt or empty"
                                                                           })
              const file = req.file;
              const uniqueFileName = file.originalname + Date.now();
              await  uploadFile( uniqueFileName, file.mimetype, file.buffer);
              const fileUrl = await getFileUrl(uniqueFileName);
              const updatedUser = await UserModel.findOneAndUpdate({_id: userId},{$push:{avatar: fileUrl[0]} }, {new: true} )
              res.status(200).json({
                status:"Success",
                data: updatedUser
               })

          }catch(e :any){
            res.status(500).json({
                status:"failed",
                message:"Internal server error",
                info:e.message,
            
            })
          }
          
    },
    updateUsername: async  (req:CustomRequest, res:Response , next:NextFunction) => {
        const { userId } = req.user;
        const { nickname} = req.body
        try{
           
            const updatedUser = await UserModel.findOneAndUpdate({_id: userId},{username: nickname} , {new: true} )
            res.status(200).json({
                status:"Success",
                data: updatedUser
             })

        }catch(e :any){
          res.status(500).json({
              status:"failed",
              message:"Internal server error",
              info:e.message,
          
          })
        }
    },
    updateBio: async  (req:CustomRequest, res:Response , next:NextFunction) => {
        const { userId } = req.user;
        const { bio } = req.body
        console.log(bio)
        try{
           
            const updatedUser = await UserModel.findOneAndUpdate({_id: userId},{ bio: bio} , {new: true} )
            res.status(200).json({
                status:"Success",
                data: updatedUser
             })

        }catch(e :any){
          res.status(500).json({
              status:"failed",
              message:"Internal server error",
              info:e.message,
          
          })
        }
    },
    getFriendSuggestion: async (req:CustomRequest, res:Response , next:NextFunction) => {
        const { userId } = req.user;
        try{
              const friendSuggestions =  await getFriendSuggestion(userId);
              res.status(200).json({
                   status:"Success",
                   data: friendSuggestions
              })
        }catch(e : any){
            res.status(500).json({
                status:"failed",
                message:"Internal server error",
                info:e.message,
            
            })
        }
    }
}