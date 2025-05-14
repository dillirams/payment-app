import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "../button/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";


type FormType={
    name:string,
    password:string
}

export function SignIn(){
    const {register,handleSubmit}=useForm<FormType>();
    const navigate=useNavigate();

    const onsubmit:SubmitHandler<FormType>=async({name,password})=>{
        try{
            const response=await axios.post("http://localhost:3000/user/signin",{
            name,
            password,
        })
        const jwt=response.data.token;
        localStorage.setItem("token",jwt);
        navigate('/dashboard')
        
        }catch(e){
            console.log(e);
        }
        
    }
    return <div className="flex justify-center items-center h-screen w-screen">
    
            <form action="" onSubmit={handleSubmit(onsubmit)} className="md:w-76 md:h-100 shadow-xl/30 rounded-xl p-3 grid ">
            <div className="flex justify-center text-3xl font-bold py-2">
                <p>Sign In</p>
            </div>
            <div className="p-2 grid gap-1">
                <div className="">
                    <input type="text" {...register("name")} className="px-3 py-2 rounded-lg shadow-xl/20 w-full " placeholder="name" />
                </div>
                
                <div className="">
                    <input type="text" {...register("password")} className="px-3 py-2 rounded-lg shadow-xl/20 w-full " placeholder="password" />
                </div>
                <div className="mt-3">
                    <Button auth={true} text="Sign In"/>
                </div>
            </div>
           
            </form>
    
        </div>
}