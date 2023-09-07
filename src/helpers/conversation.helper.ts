import { ObjectId } from "mongoose";
const ConversationModel = require('../Model/model.conversation');
const MessageModel = require('../Model/model.message');

const isUserMember = async(userId: ObjectId, conversationId: ObjectId) => {
    const conversation = await ConversationModel.findOneById(conversationId).select('members');
    return conversation?.members.includes(userId); 
}

const isOwner = async (userId: ObjectId, conversationId: ObjectId, messageId: ObjectId) => {
     const isMember = await isUserMember(userId, conversationId);
     if(!isMember) return false;
     const message =  await MessageModel.findOneById(messageId);
     if(!(message._author == userId)) return false;
     return true;
}
const getConversationMessages = async (conversationId:ObjectId, limit:number ) => {
    
      return await ConversationModel.findOneById(conversationId)
                                     .populate('messages')
                                     .limit(limit)
                                     .sort({ createdAt: -1})
                                     .exec()
}
const getUserConversations = async (userId: ObjectId, limit:number) => {
     
     return await  ConversationModel.find({members: userId})
                                     .limit(limit)
                                     .sort({ createdAt: -1})
                                     .exec()
}
module.exports ={
  isUserMember,
  isOwner,
  getConversationMessages,
  getUserConversations
}