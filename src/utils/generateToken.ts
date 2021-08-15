import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const {ObjectId}=mongoose.Types

export const generatetoken=(id:typeof ObjectId):string|typeof ObjectId|undefined=>{
   return jwt.sign({id},`${process.env.SECRET}`,{
       expiresIn:'1d'
   })
}