import { Schema, Types, model } from "mongoose"


interface IConversation{
    type: 'private' | 'group'| 'public' 
    members: Types.Array<Types.ObjectId>
}

const ConversationSchema = new Schema<IConversation>({
    type: { type:String , required:true},
    members:[{
         type: Schema.Types.ObjectId,
         ref:'User'
    }]
},{
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

ConversationSchema.pre('find', function(next){
     this.populate({ path: 'members', select: ['avatar','username'] })
         
     next()
})

//Todo: make a virtual method to retrieve conversation'messages
ConversationSchema.virtual('lastMessage',{
    ref:'Message',
    localField: '_id',
    foreignField:'conversationId',
    options:{
        limit:1,
        sort:{createdAt: -1}
    }
})

ConversationSchema.virtual('messages',{
    ref:'Message',
    localField: '_id',
    foreignField:'conversationId',
    options:{
        populate: { path: 'author', select: ['avatar','username'] },
        sort:{createdAt: -1},
       
    }
    
})

module.exports = model<IConversation>('Conversation',ConversationSchema)