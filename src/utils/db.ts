
import mongoose from 'mongoose'

export const connection=async (callback:()=>void)=>{
     try {
        await mongoose.connect(`${process.env.MONGO_URI}`,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        })
        callback()
     } catch (error) {
         console.log(error)
     }
}