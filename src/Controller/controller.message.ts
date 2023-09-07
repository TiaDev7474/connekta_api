import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../Middleware/middleware.auth";
const { isUserMember, isOwner } = require('../helpers/conversation.helper');
const MessageModel = require('../Model/model.message');


module.exports ={
    sendOne: async (req: CustomRequest, res:Response, next: NextFunction) => {
          const { conversationId } = req.params;
          const { userId } = req.user;
          const { messageContent }  = req.body
          try{
              const isMember: boolean | null = await isUserMember(userId, conversationId); 
              if(!isMember) return res.status(403)
                                      .json({
                                          status:403,
                                          message: "Not authorized to perform this action"
                                      })
             const newMessage = new MessageModel({
                conversationId: conversationId,
                author: userId,
                content:{
                    text: messageContent
                }
                
             });
             const savedMessage = await newMessage.save();
             res.status(201)
                .json({
                    status:"Success",
                    message: "Message sent successfully",
                    data: savedMessage
                })

          }catch(e : any){
                res.status(500).json({
                    status:500,
                    message:"Internal server error",
                    info:e.message,
                    
                })
          }
    },
    deleteOne: async (req: CustomRequest, res:Response, next: NextFunction) => {
        const { conversationId , messageId} = req.params;
        const { userId } = req.user;
        try{
            const isUserOwner: boolean | null  = await isOwner(userId, conversationId, messageId); 
            if(!isUserOwner) return res.status(403)
                                    .json({
                                        status:403,
                                        message: "Not authorized to perform this action"
                                    })
            res.status(200)
              .json({
                  status:"Success",
                  message: "Message deleted successfully",
                 
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