import mongoose,{Schema,Document} from 'mongoose'
import {UserModel} from './user'

export interface PostModel extends Document{
   user:UserModel["_id"]
   content:string
   createdAt:Date
   updatedAt:Date
}


const postSchema=new Schema({
    user:{type:mongoose.Types.ObjectId,ref:'User'},
    content:{type:String}
},{timestamps:true})


const Post=mongoose.model<PostModel>('Post',postSchema)

export default Post