import mongoose,{HookNextFunction,Schema,Document} from 'mongoose'
import bcrypt from 'bcryptjs'

export interface UserModel extends Document{
  name:string
  email:string
  password:string
  createdAt:Date
  updatedAt:Date
  comparePassword(arg:string):Promise<boolean>

}

const userSchema=new Schema({
  name:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,minlength:4,maxlength:8},
  
},{timestamps:true})


userSchema.pre('save',async function(next:HookNextFunction){
   let user=this as UserModel
   if(!user.isModified('password')){
       next()
   }

   const salt=await bcrypt.genSalt(10)
   user.password=await bcrypt.hash(user.password,salt)
  
})

userSchema.methods.comparePassword=async function(enteredPassowrd:string){
    let user =this as UserModel
    return await bcrypt.compare(enteredPassowrd,user.password).catch(e=>console.log(e))
}


const User=mongoose.model<UserModel>('User',userSchema)

export default User