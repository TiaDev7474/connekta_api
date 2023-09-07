import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../Middleware/middleware.auth";
const { isMember, getConversationMessages, getUserConversations } = require('../helpers/conversation.helper');


module.exports = {
      getMessages: async (req: CustomRequest, res: Response, next: NextFunction) => {
            const { conversationId } = req.params;
            const { userId } = req.user;
            const { lastPage, perPage} = req.body;
            const limit =  (lastPage -1 ) * perPage;
            try{
                 const isUserMember = await  isMember(userId, conversationId)
                 if(!isUserMember) return res.status(403)
                                          .json({
                                              status:403,
                                              message: "Not authorized to perform this action"
                                          })
                 const conversations = await  getConversationMessages(conversationId, limit);
                 res.status(200).json({
                      status: "Success",
                      message:"Conversation Retrieve successfully",
                      data: conversations
                 })

            }catch(e: any){
                res.status(500).json({
                    status:500,
                    message:"Internal server error",
                    info:e.message,
                    
                })
            }
      },
      getConversationsList: async (req: CustomRequest, res: Response, next: NextFunction) => {
            const { userId } = req.user;
            const { lastPage, perPage } = req.body;
            const limit =  (lastPage -1 ) * perPage;
            try{
                  const conversationList = await  getUserConversations(userId, limit);

                  res.status(200).json({
                        status:"Success",
                        data: conversationList,
                        lastPage: lastPage + conversationList?.length
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