import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../button/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type FormInput={
    name:string,
    email:string,
    password:string,
   
}
export function Signup(){
    const {register,
         handleSubmit,
        formState:{errors}} = useForm<FormInput>();
    const navigate=useNavigate();

    const onsubmit:SubmitHandler<FormInput>=async({name,email,password})=>{
        try{
        console.log(name);
        const response= await axios.post("http://localhost:3000/user/signup",{
            name,
            email,
            password,
           
        })
        navigate('/signin')
        }catch(e){
            console.log(e);
        }
        
    }
    return <div className="flex justify-center items-center h-screen w-screen">
    
            <form action="" onSubmit={handleSubmit(onsubmit)} className="md:w-76 md:h-100 shadow-xl/30 rounded-xl p-3 grid ">
            <div className="flex justify-center text-3xl font-bold py-2">
                <p>Sign Up</p>
            </div>
            <div className="p-2 grid gap-1">
                <div className="">
                    <input type="text" {...register("name",{required:true})} className="px-3 py-2 rounded-lg shadow-xl/20 w-full " placeholder="name" />

                </div>
                <div className="">
                <input type="text" {...register("email")} className="px-3 py-2 rounded-lg shadow-xl/20 w-full " placeholder="email" />
                </div>
                <div className="">
                    <input type="text" {...register("password")} className="px-3 py-2 rounded-lg shadow-xl/20 w-full " placeholder="password" />
                </div>
            
                <div className="mt-3">
                    <Button auth={true} text="Sign Up"/>
                </div>
            </div>
           
            </form>
    
        </div>
}