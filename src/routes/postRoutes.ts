

import express,{Request,Response} from 'express'
import { createPost,getPosts,getPostById } from '../controllers/posts'
import {isLoggedIn,isTaskOwner} from '../middlewares/user'

const router=express.Router()

router.get('/',isLoggedIn,getPosts)

router.get('/:id',isLoggedIn,isTaskOwner,getPostById)

router.post('/create',isLoggedIn,createPost)



export {router as postRouter}