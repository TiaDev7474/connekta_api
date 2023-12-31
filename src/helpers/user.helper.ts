import mongoose, { ObjectId } from "mongoose"
const UserModel = require('../Model/model.user')
const { getUserFriendList } = require('./friendship.helper')

async function getUserById(userId: mongoose.ObjectId) {
     return await UserModel.findById(userId); 
}
async function getUserByEmail(email: string){
    // console.log( await UserModel.findOne({email: email}))
    return await UserModel.findOne({email: email});
}
async function updateUserProfile(){

}
async function createUser(email: string, password:string){
    const newUser = new UserModel({
        email:email,
        password:password
    })
    return await newUser.save()
}



module.exports = {
    getUserById,
    getUserByEmail,
    createUser,
}