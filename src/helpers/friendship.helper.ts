import mongoose from "mongoose"
const FriendShipModel = require('../Model/model.friendship');
const ConversatioModel = require('../Model/model.conversation')
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

module.exports = {
    initiateFriendShipAndConversation,
}