import express,{Application} from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import {connection} from './utils/db'
import {userRouter} from './routes/userRoutes'
import { postRouter } from './routes/postRoutes'

dotenv.config()

const app:Application=express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


app.use('/user',userRouter)
app.use('/posts',postRouter)

const port=process.env.PORT || 3001

connection(()=>{
    app.listen(port,()=>console.log(`Server running on port ${port} and Database is also running`)
    )
})


