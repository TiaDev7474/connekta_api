import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../Middleware/middleware.auth";

const { isMember, isOwner , deleteMessage} = require('../helpers/conversation.helper');
const { uploadFile , getFileUrl} = require('../Services/firebase-storage');
const MessageModel = require('../Model/model.message');


module.exports ={
    sendOne: async (req: CustomRequest, res:Response, next: NextFunction) => {
          const { conversationId } = req.params;
          const { userId } = req.user;
          
          const { messageContent }  = req.body
        
          try{
              console.log(req.file)
              let content;
              if(req.file){
                   const file = req.file
                   const uniqueFileName = file.originalname + Date.now();
                   await  uploadFile( uniqueFileName, file.mimetype, file.buffer);
                   const fileUrl = await getFileUrl(uniqueFileName)
                   content = {
                       file:{
                            mimetype:file.mimetype,
                            url: fileUrl[0]
                       }
                       
                   };
                   console.log(content)
              }else{
                  content = {
                         text: messageContent
                  }
              }
              const isUserMember: boolean | null = await isMember(userId, conversationId); 
              if(!isUserMember) return res.status(403)
                                      .json({
                                          status:403,
                                          message: "Not authorized to perform this action"
                                      })
             const newMessage = new MessageModel({
                conversationId: conversationId,
                author: userId,
                content: content
                
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
            await deleteMessage(messageId);
            res.status(200)
              .json({
                  status:"Success",
                  message: "Message deleted successfully",
                 
              })

        }catch(e : any){
              res.status(500).json({
                  status:500,
                  message:"Internal server error",
                  info:e,
                  
              })
        }
  },
  //todo: allow user to react a message 
  reactOne:  async (req: CustomRequest, res:Response, next: NextFunction) => {
  }
}