import { Schema, Types, model } from "mongoose";


export interface IFriendShip{
    user:Schema.Types.ObjectId,
    friend:Schema.Types.ObjectId,
    members:Types.Array<Schema.Types.ObjectId>,
    status:string
}

const FriendshipSchema = new Schema<IFriendShip>({
    user:{ type: Schema.Types.ObjectId , ref:'User'},
    friend: { type: Schema.Types.ObjectId , ref:'User'},
    // members:[{type: Schema.Types.ObjectId , ref:'User'}],
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
// FriendshipSchema.pre('find', function (next) {
//      this.populate('user friend');
//      next()
// })
module.exports= model<IFriendShip>('FriendShip', FriendshipSchema)