import {Response} from 'express'
import { IUserRequest } from '../middlewares/user'
import Post, { PostModel } from '../models/posts'

export const getPosts=async (req:IUserRequest,res:Response):Promise<Response>=>{
   try {
       const posts=await Post.find({}).populate('user','name email')
       return res.status(200).json({posts})
   } catch (error) {
       throw new Error('Fetch failed')
   }
}

export const getPostById=async (req:IUserRequest,res:Response):Promise<Response>=>{
    const id:string=req.params.id
   try {
       const post=await Post.findById(id).populate('user','name email')
       return res.status(200).json({post})
   } catch (error) {
    throw new Error('Fetch failed')
   }
}

export const createPost=async(req:IUserRequest,res:Response):Promise<Response>=>{
     const input=req.body as PostModel
    try {
        await Post.create(input)
        return res.status(201).json({message:'Post created'})
    } catch (error) {
        throw new Error('post creation failed')
    }
}


