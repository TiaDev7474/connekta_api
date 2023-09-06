import { Schema, Types, model } from "mongoose";


type MessageContentType = {
    text: string,
    file:{
        type:'image'|'video'|'audio',
        url:string
    },
   
}

interface IMessage {
    conversationID: Types.ObjectId,
    author: Types.ObjectId,
    content:MessageContentType,
    readBy:Types.ObjectId,
    reactions:{
        author: Types.ObjectId,
        type:String
    }

}

const MessageSchema = new Schema<IMessage>({
    conversationID:{ type: Schema.Types.ObjectId, ref:'Conversation'},
    author:{ type: Schema.Types.ObjectId, ref:'User'},
    content:{
        text:String,
        file:{
            type:String,
            url:String
        }
    },
    reactions:[{
        author:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        type:{
            type:String,
       }
    }],
    readBy:{ type: Schema.Types.ObjectId, ref:'User'}
},
{
    timestamps:true
})

module.exports = model<IMessage>('Message',MessageSchema)

