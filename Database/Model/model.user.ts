
import { Schema, Types, model  } from "mongoose";
const bcrypt = require('bcrypt')

type DeviceType = {
    name: string,
    type:string,
    ipAddress:string
    browser:string,
    lastLogin:Date
}
export interface IUser {
    username: string,
    email: string,
    bio?:string,
    isVerified:boolean
    lastActivity:Date
    avatar?: Types.Array<string>,
    password:string,
    devices:Types.Array<DeviceType> 
}
// Put all user instance methods in here
interface IUserMethods {
    comparePassword(password:string):Promise<any>;
}

const UserSchema = new Schema<IUser,{},IUserMethods>({
    username:{ type: String , required:true},
    email:{ type: String , index:true},
    bio:{ type: String},
    isVerified:{type: Boolean , default:false},
    lastActivity:{ type: Date , default: Date.now()},
    avatar:[String],
    password:{type: String, required: true}
},{
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

//Methods to compare inputpassword and user hashed password
UserSchema.method('comparePassword', function comparePassword(candidatePassword){
     return new Promise((resolve, reject) => {
          bcrypt.compare(candidatePassword, this.password,(err:any, isMatch: boolean) =>{
                if(err) reject(err)
                 resolve(isMatch)
          } )
     })
})

//static method that compare user password and a method that hash password before saving document
UserSchema.pre('save', async function(next){
    let user = this;
    if(!(user.isModified('password')) || !(user.isNew) ){
        return next();
    }
    try{
        const hashedPassword = await bcrypt.hash(user.password, await bcrypt.getSalt(10));
        user.password = hashedPassword;
        return next();
                                     
    }catch(error:any){
        return next(error)
    }

})
//virtual populate that retrieve all user conversation
UserSchema.virtual('conversations',{
    ref:'Conversation',
    localField:'_id',
    foreignField:'members'
})
module.exports = model<IUser, IUserMethods>('User',UserSchema)