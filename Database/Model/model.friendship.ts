import { Schema, Types, model } from "mongoose";


interface IFriendShip{
    user:Types.ObjectId,
    friend:Types.ObjectId,
    status:string
}

const FriendshipSchema = new Schema<IFriendShip>({
    user:{ type: Schema.Types.ObjectId , ref:'User'},
    friend: { type: Schema.Types.ObjectId , ref:'User'},
    status:{
         type: String,
         enum:['active','blocked','hidden'],
         default:'active'
    }
},
  {
     timestamps:true
  }
)

module.exports= model<IFriendShip>('FriendShip', FriendshipSchema)