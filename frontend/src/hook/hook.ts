import axios from "axios";
import { useEffect, useState } from "react";

export  function useContent(url:string){
    console.log("hello");
        const [content, setContent]=useState();
        const [users, setUsers]=useState([])
        async function getContent() {
            let response=await axios.get("http://localhost:3000/user/money",{
                headers:{
                    "token":localStorage.getItem("token")
                }
                
            });
            console.log("hello from outside");
            setContent(response.data)
            setUsers(response.data.user)
            console.log(users);
        }

    useEffect(()=>{
        getContent();
    
    },[])

    return {
        content,
        users
    }
    
}