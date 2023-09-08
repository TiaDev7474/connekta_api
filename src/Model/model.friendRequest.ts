import { Schema, Types, model } from "mongoose";


interface IFriendRequest {
    author:Types.ObjectId,
    destination: Types.ObjectId
    status:string
}

const FrienRequestSchema = new Schema<IFriendRequest>({
    author:{ type: Schema.Types.ObjectId, ref:'User'},
    destination: { type: Schema.Types.ObjectId, ref:'User'},
    status:{ type: String, enum:['pending','approved','rejected'], default:'pending'}
},{
    timestamps:true
})
//static method that populate author and destination before every find method is performed
//Todo: select only the necessary field to be selected
FrienRequestSchema.pre('find', function(next){
     this.populate({path: 'author', select:["_id", "username", "avatar"]})
         .populate({path: 'destination', select:["_id", "username", "avatar"]})
         
     next()
})

module.exports = model<IFriendRequest>('FriendRequest',FrienRequestSchema)
