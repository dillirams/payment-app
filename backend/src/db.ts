import mongoose  from "mongoose";
import { number } from "zod";
const Schema=mongoose.Schema;

const userSchema=new Schema({
name:String,
password:String,
email:String,
phone:Number
})

const walletSchema=new Schema({
    userId:{type:mongoose.Schema.ObjectId, ref:"user"},
    balence:Number,
})

const transaction=new Schema({
    walletId:{type:mongoose.Schema.ObjectId, ref:"wallet"},
    transactionType:{type:String, enum:['credit','debit']},
    amount:{type:Number,require:true}
})


export const userModel=mongoose.model("user",userSchema);
export const walletModel=mongoose.model("wallet",walletSchema);
export const transactionModel=mongoose.model("transaction",transaction)