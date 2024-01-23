import { MoreVertical } from "lucide-react";


export default function UserInfo() {
  return (
    <div className="p-2 flex items-center justify-between">
        <div className="flex items-center ">
           <img 
                src="https://picsum.photos/200" 
                alt="" 
                className=" w-8 h-8 bg-slate-800 rounded-full" 
            />
            <span className=" text-xs p-2">
                <p>Alies</p>
                <p>Jan 22, 2024</p>
            </span> 
        </div>
        <MoreVertical className=" w-6 h-6" />
    </div>
  )
}
