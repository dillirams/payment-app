import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';
import { userRouter } from './router';
dotenv.config(); 
const app=express();

app.use(cors());
app.use(express.json());
app.use('/user',userRouter)
async function main() {
    if(!process.env.MONGODB_URL){
        throw new Error("no mongoDB url found")
    }
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(3000,()=>{
        console.log("the app is listening to port 3000")
    })
}
main();