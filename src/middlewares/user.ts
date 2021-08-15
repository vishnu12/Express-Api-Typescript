import {Request,Response,NextFunction} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User, { UserModel } from '../models/user'
import Post from '../models/posts'

interface IdOut{
    id:string |JwtPayload
}

export interface IUserRequest extends Request{
    user?:UserModel
}

export const isLoggedIn=async (req:IUserRequest,res:Response,next:NextFunction)=>{
   const token=req.headers.authorization?.split(' ')[1]
   if(token){
       try {
        const {id}=await jwt.verify(token,`${process.env.SECRET}`) as IdOut
        const userData=await User.findById(id).select('-password') as UserModel
        req.user=userData
        next()
       } catch (error) {
           throw new Error('Execution failed')
       }
   }else{
       res.status(400).json({error:'Authentication failed'})
   }
}


export const isTaskOwner=async (req:IUserRequest,res:Response,next:NextFunction)=>{
     try {
         const post=await Post.findOne({user:req.user?._id})
         if(post){
            next()
         }else{
             throw new Error('You are not authenticated')
         }
     } catch (error) {
        res.status(401).json({err:'Not authorised'})
     }
}