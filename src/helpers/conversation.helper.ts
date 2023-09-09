import { ObjectId } from "mongoose";
const ConversationModel = require('../Model/model.conversation');
const MessageModel = require('../Model/model.message');

const isMember = async(userId: ObjectId, conversationId: ObjectId) => {
    const conversation = await ConversationModel.findById(conversationId).select('members');
    console.log(conversation)
    return conversation?.members.includes(userId); 
}

const isOwner = async (userId: ObjectId, conversationId: ObjectId, messageId: ObjectId) => {
     const isUserMember = await isMember(userId, conversationId);
     console.log(isUserMember)
     if(!isUserMember) return false;
     const message =  await MessageModel.findById(messageId);
     if(!(message.author == userId)) return false;
     return true;
}
const deleteMessage = async (messageId: ObjectId) => {
     return await MessageModel.deleteOne({_id: messageId})
}
const getConversationMessages = async (conversationId:ObjectId, limit:number ) => {
    
      return await ConversationModel.find({ _id:conversationId}).
                                     populate({ path:'messages', options:{ limit: limit }}).
                                     exec()
}
const getUserConversations = async (userId: ObjectId, limit:number) => {
     
     return await  ConversationModel.find({members: userId})
                                     .populate('lastMessage')
                                     .limit(limit)
                                     .sort({ createdAt: -1})
                                     .exec()
}
module.exports ={
  isMember,
  isOwner,
  getConversationMessages,
  getUserConversations,
  deleteMessage
}