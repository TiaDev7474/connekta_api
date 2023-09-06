import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../Middleware/middleware.auth";
const { initiateFriendShipAndConversation } = require('../helpers/friendship.helper')
const RequestModel = require('../Model/model.friendRequest');
module.exports = {
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
                    message:"Friend Request succesfully sent"
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
            const { requestId } = req.body;
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
     declineOne: async (req: Request, res:Response, next: NextFunction) => {
        const { userId } = (req as CustomRequest).user;
        const { requestId } = req.body;
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