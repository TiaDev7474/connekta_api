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
     this.populate('members')
     next()
})

//Todo: make a virtual method to retrieve conversation'messages

ConversationSchema.virtual('messages',{
    ref:'Message',
    localField: '_id',
    foreignField:'conversationID',
})

module.exports = model<IConversation>('Conversation',ConversationSchema)