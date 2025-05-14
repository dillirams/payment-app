import {Router} from 'express'
import zod, { number } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
import { userModel, walletModel } from './db';
import { authentication } from './middleware'
import mongoose from 'mongoose'

export const userRouter=Router(); 
const zodValidation=zod.object({
    name:zod.string().min(5).max(10),
    password:zod.string().min(4).max(12),
    email:zod.string().email(),
   


})

userRouter.post("/signup", async(req,res)=>{
    
    const {name, password, email,}=req.body
    const inputValdataion=zodValidation.safeParse(req.body);
    if(!inputValdataion.success){
        res.status(400).json({
            message:"incorrect input format",
            error:inputValdataion.error
        })
        return
    }
    try{
        const user=await userModel.findOne({
            name:name
        })
        if(user){
            res.status(400).json({
                message:"user already exist"
            })
            return
        }
        const hashedPassword=await bcrypt.hash(password,5);
        const newUser=await userModel.create({
            name:name,
            password:hashedPassword,
            email:email,
           
        })
        await walletModel.create({
            userId:newUser._id,
            balence:0
        })
        res.status(200).json({
            message:"you signedup successfully"
        })
    }catch(e){
        console.log(e);
        res.status(400).json({
            message:"something went wrong"
        })
    }
})

userRouter.post('/signin', async(req,res)=>{
     const {name, password}=req.body;
     const user= await userModel.findOne({
        name:name
     })
     if(!user){
        res.status(400).json({
            message:"user does not exist"
        })
        return
     }
     const decodedPassword=await bcrypt.compare(password,user.password as string);
     if(!decodedPassword){
        res.status(400).json({
            message:"invalid password"
        })
        return
     }
     try{
        const token=jwt.sign({
            id:user._id
        },process.env.JWT_SECRET as string)
        res.status(200).json({
            message:"logedin successfully",
            token:token
        })
     }catch(e){
        res.status(400).json({
            message:"something went wrong"
        })
     }
})

userRouter.post('/addmoney',authentication,async(req,res)=>{
    const seession=await mongoose.startSession();
    
    //@ts-ignore
    const senderId=req.id;
    
    const amount=req.body.amount;
    const receiverId=req.body.receiverId.id;
   
    
    await seession.startTransaction();
    try{
        const user=await walletModel.findOne({
            userId:senderId
        })
        console.log("user found");
        //@ts-ignore
        if(user?.balence<amount){
           
            res.status(400).json({
                message:"insuffient balance"
            })
             await seession.abortTransaction();
             console.log("insuffient balance");
            return
        }
        const receiver=await walletModel.findOne({
            userId:receiverId
        })
        if(!receiver){
            
            res.status(400).json({
                message:"invalid account"
            })
            await seession.abortTransaction();
             console.log("invalid receiver");
            return
        }
    await walletModel.updateOne({
        userId:senderId
    },{
        $inc:{balence:-amount}
    })
    
    await walletModel.updateOne({
    userId:receiverId,
},{
    $inc:{balence:amount}
})

    res.status(200).json({
        message:"transmitted successfylly",
       
    })

    }catch(e){
        console.log(e );
        await seession.abortTransaction();
        res.status(400).json({
            message:"something went wrong"
        })
    }finally{
await seession.commitTransaction();
    }
   

})

userRouter.get('/money',authentication,async(req,res)=>{
    //@ts-ignore
    const userId=req.id;
    try{
        const money=await walletModel.findOne({
            userId:userId
        })
        const name=await userModel.findOne({
            _id:userId
        })
        const user=await userModel.find({_id: { $ne: userId }});
        console.log(user);
       
        res.status(200).json({
            name:name?.name,
            balance:money?.balence,
            user:user
        })
    }catch(e){
        res.status(400).json({
            message:"something went wrong",
            
        })
        console.log(e);
    }
})