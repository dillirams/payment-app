import { NextFunction,Request,Response } from "express";
import jwt from 'jsonwebtoken'

export function authentication(req:Request, res:Response, next:NextFunction){
    const token=req.headers.token as string;
    const decondedData= jwt.verify(token,process.env.JWT_SECRET as string);
    if(decondedData){
        //@ts-ignore
        req.id=decondedData.id,
        next();
    }else{
        res.status(400).json({
            message:"something went wrong"
        })
    }
}