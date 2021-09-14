
import {Response} from 'express'
import { IUserRequest } from '../middlewares/user'
import User from '../models/user'
import { generatetoken } from '../utils/generateToken'


export const signup=async (req:IUserRequest,res:Response)=>{
    const {email}=req.body
    try {
        const userExists=await User.findOne({email})
        if(userExists) return res.status(400).json({message:'User Already Exists'})
        const user=new User({...req.body})
        const newUser=await user.save()
        return res.status(201).json({newUser})
    } catch (error) {
        console.log(error)
    }
}

export const login=async (req:IUserRequest,res:Response)=>{
   const {email,password}=req.body
   try {
       const userExists=await User.findOne({email})
       if(userExists && userExists.comparePassword(password)){
           const token=generatetoken(userExists._id)
           res.cookie('token',token,{httpOnly:true}).json({message:'logged In'})
       }else{
           res.status(404).json({error:'User does not exist'})
       }
   } catch (error) {
       throw new Error('Login failed')
   }
}

export const logout=(req:IUserRequest,res:Response)=>{
   res.clearCookie('token')
   .json({message:'logged out'})
}