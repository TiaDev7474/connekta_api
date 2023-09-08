import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../Middleware/middleware.auth";
import { isValidObjectId } from "mongoose";
const { initiateFriendShipAndConversation } = require('../helpers/friendship.helper')
const RequestModel = require('../Model/model.friendRequest');
module.exports = {
     getAll: async(req: Request, res:Response, next: NextFunction) => {
           const { userId } = (req as CustomRequest).user
           const { lastPage , perPage  }= req.query;
           const limit =  Number(lastPage) - 1 * Number(perPage);
           try{
                const requests = await RequestModel.
                                                   find({destination: userId}).
                                                   limit(limit).
                                                   sort({createdAt: -1}).
                                                   exec();
                res.status(200).json({
                      status:200,
                      message:"Request successfully retrieved",
                      data: requests
                });


           }catch(e: any){
                res.status(500).json({
                    status:500,
                    message:"Internal server error",
                    info:e.message,
                    
                })
           }
     },
     sendOne: async (req: Request, res:Response, next: NextFunction) => {
           const { senderId, receiverId } = req.body;
           const { userId } = (req as CustomRequest).user;
           if(!(userId == senderId)) return res.status(403)
                                               .json({
                                                    status:403,
                                                    message: "Not authorized to perform this action"
                                               })
            try{
                const newRequest =  await new RequestModel({
                    author: userId,
                    destination: receiverId
                 })
                await newRequest.save();
                //Todo: notify user about incoming friend request using socket.io
                res.status(201).json({
                    status:201,
                    message:"Friend Request succesfully sent",
                    data:newRequest
                })

            }catch(e: any){
                res.status(500).json({
                    status:500,
                    message:"Internal server error",
                    info:e.message,
                     
                })
            }                                      
     },
     acceptOne: async (req: Request, res:Response, next: NextFunction) => {
            const { userId } = (req as CustomRequest).user;
            const { requestId } = req.params;
            // console.log(userId)
            try{
                const filter = {
                    _id: requestId, 
                    destination: userId
                }
                const UpdatedRequest = await  RequestModel.findOneAndUpdate(filter,{ status: 'approved'},{new: true, rawResult: true})
                //Todo: send notification  for the accepted request to user
               
                if(!UpdatedRequest.value) return res.status(403)
                                                    .json({
                                                        status:403,
                                                        messsage:" Not authorized to perform this request"
                                                    })
                const friendId = UpdatedRequest.value.author
                await initiateFriendShipAndConversation(userId, friendId)
                
                res.status(200).json({
                     status: 200,
                     message:"Request successfully accepted",
                     data: UpdatedRequest.value
                })
            }catch(e : any){
                res.status(500).json({
                    status:500,
                    message:"Internal server error",
                    info:e.message,
                     
                })
            }
     },
     deleteOne: async (req: Request, res:Response, next: NextFunction) => {
          const { userId } =  (req as CustomRequest).user;
          const { requestId } = req.params;
          try{
                const request = await RequestModel.findOneById(requestId);
                if(!(request?.author == userId)) return res.status(403)
                                                        .json({
                                                            status:403,
                                                            messsage:" Not authorized to perform this request"
                                                        })
                await RequestModel.deleteOne({_id: requestId})
                res.status(200).json({
                     status:"Succes",
                     message: "Request deleted"
                })
            
          }catch(e: any){
                res.status(500).json({
                    status:500,
                    message:"Internal server error",
                    info:e.message,
                    
                })
          }
        
               
          
     },
     
     declineOne: async (req: Request, res:Response, next: NextFunction) => {
        const { userId } = (req as CustomRequest).user;
        const { requestId } = req.params;
        try{
            const filter = {
                _id: requestId, 
                destination: userId
            }
            const UpdatedRequest = await  RequestModel.findOneAndUpdate( filter ,{ status: 'rejected'},{new: true, rawResult: true})
            if(!UpdatedRequest.value) return res.status(403)
                                                .json({
                                                     status:403,
                                                     messsage:" Not authorized to perform this request"
                                                })
            res.status(200).json({
                 status: 200,
                 message:"Request successfully accepted",
                 data: UpdatedRequest.value
            })
        }catch(e : any){
            res.status(500).json({
                status:500,
                message:"Internal server error",
                info:e.message,
                 
            })
        }
 }
}