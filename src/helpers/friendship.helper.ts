import mongoose, { Document, ObjectId } from "mongoose"
import { IFriendShip } from "../Model/model.friendship";
const FriendShipModel = require('../Model/model.friendship');
const ConversatioModel = require('../Model/model.conversation');
const UserModel = require('../Model/model.user');
const initiateFriendShipAndConversation =  async (userId: mongoose.ObjectId, friendId: mongoose.ObjectId) => {
      const newFriendShip = new FriendShipModel({
            user: userId,
            friend: friendId
      });
      const newConversation = new ConversatioModel({
            type:'private',
            members:[ userId,friendId ]   
      })
      return  Promise.all([ await newFriendShip.save(), await newConversation.save() ])
}

async function getUserFriendList(userId: ObjectId){

      return await FriendShipModel.find({ $or: [{ user: userId }, {friend: userId }]}).limit(10).exec();
}
async function getFriendSuggestion(userId: mongoose.Schema.Types.ObjectId){
      const userFriendList =  await getUserFriendList(userId);
      const userFriendIds = userFriendId(userId, userFriendList);
      console.log(userFriendIds);
      return UserModel.find({_id:{$nin: userFriendIds, $ne:userId}});
}
  
function userFriendId(userId: mongoose.Schema.Types.ObjectId, userFriendList:IFriendShip[]){
       return  userFriendList.map((f:IFriendShip) => {
              if( f.user == userId ) return f.friend
              return f.user;
       }) 

}
module.exports = {
    initiateFriendShipAndConversation,
    getUserFriendList,
    getFriendSuggestion
}