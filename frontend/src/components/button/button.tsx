interface ButtonProps{
    onClick?:()=>void,
    auth?:Boolean,
    text:string
}

const defaultStyle="bg-gray-900 text-white font-md py-3 px-4 rounded-lg hover:bg-gray-600 cursor-pointer"
export function Button(props:ButtonProps){
    return <button onClick={props.onClick} className={`${defaultStyle} ${props.auth&&"w-full bg-green-500"}`}>
        {props.text}
    </button>
}