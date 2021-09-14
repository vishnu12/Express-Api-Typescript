import express,{Response} from 'express'
import { login, signup,logout } from '../controllers/user'

const router=express.Router()

router.get('/',(_,res:Response)=>{
    res.status(200).json({message:"hi"})
})

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)


export {router as userRouter}