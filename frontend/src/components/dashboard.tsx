import { useContent } from "../hook/hook";
import { UserCart } from "./cart/cart";


export function Dashboard(){
    const {content,users}=useContent("http://localhost:3000/user/money")
    
    return <>
    <div className="px-4 grid gap-3 px-4">
        <div className="flex justify-between ">
                <p className="text-2xl font-bold">Payment App</p>
                <p>Hello, {content?.name}</p>
        </div>
        <div className=" flex gap-2 text-xl font-bold">
            <p>Your Balance is:  </p> {content?.balance}
        </div>
        <div className="mt-2">
            <p className="text-xl font-bold">Users</p>
           <input type="text" name="" id="" className="px-3 py-2 rounded-lg shadow-xl w-full mt-1" placeholder={"Search users..."}/>
        </div>
        <div>
        {users.map(({name,_id, key})=><UserCart name={name} id={_id} key={key}/>)}
            
      
        </div>
    </div>
    

 
    </>
}