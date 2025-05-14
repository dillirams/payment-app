import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../button/button"
import axios from "axios";
import { useRef } from "react";

interface MoneyCart{
    name?:String
    id?:string
}

export function SendMoneyCart(props:MoneyCart){
    const navigate=useNavigate();
    const id=useParams();
    const location=useLocation();
    const name=location.state?.name;
    const firstLetter=name?.[0]
    //@ts-ignore
    const inputRef=useRef<any>();

    async function sendMoney() {
        const amount=parseInt(inputRef.current.value);
        console.log(amount);
        const response=await axios.post(" http://localhost:3000/user/addmoney",{
            amount,
            receiverId:id
        },{
            headers:{
                "token":localStorage.getItem("token")
            }
        })
      
        navigate('/dashboard')
    }

    console.log(props.id);
    return <div className="flex justify-center items-center h-screen w-screen">

        <form action="" className="md:w-76 md:h-100 shadow-xl/30 rounded-xl p-3 grid ">
        <div className="flex justify-center text-3xl font-bold py-2">
            <p>Send Money</p>
        </div>
        <div className="p-2 grid gap-1">
            <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-green-500 flex justify-center items-center text-white font-medium ">
                    {firstLetter}
                </div>
                <p className="text-xl font-medium">{name}</p>
            </div>
            <div className="font-semibold mt-3">
                Amount (in Nu)
            </div>
            <div className="">
                <input type="text" ref={inputRef} className="px-3 py-2 rounded-lg shadow-xl/20 w-full " placeholder="Amount" />
            </div>
            <div className="mt-3">
                <Button auth={true} text="Send Money" onClick={sendMoney}/>
            </div>
        </div>
       
        </form>

    </div>
}