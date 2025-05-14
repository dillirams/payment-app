import { useNavigate } from "react-router-dom";
import { Button } from "../button/button";

 interface CartProps{
    name:string,
    id:string

 }

export function UserCart(props:CartProps){

    const navigate=useNavigate();

    return <div className="flex justify-between py-2 px-5 md:px-20 m-2 shadow-xl ">
        <p className=" text-2xl font-semibold">{props.name}</p>
        <Button text="Send Money" onClick={()=>{
            navigate(`/sendmoney/${props.id}`,{state:{name: props.name}})
        }}/>
    </div>
}