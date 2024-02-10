import { MoreVertical } from "lucide-react";


export default function UserInfo({createdAt, name, avatar}) {

  //const time = new Date("2024-02-08T18:04:20.669Z");
    //console.log(time); 
    const convertedTime = new Date(createdAt).toLocaleDateString('en-US', {  

      day:   'numeric',
      month: 'short',
      year:  'numeric',
  });
  //console.log(convertedTime);

  return (
    <div className="p-2 flex items-center justify-between">
        <div className="flex items-center ">
           <img 
                src={avatar} 
                alt="blog image" 
                className=" w-8 h-8 bg-slate-800 rounded-full" 
            />
            <span className=" text-xs p-2">
                <p>{name}</p>
                <p>{convertedTime}</p>
            </span> 
        </div>
        <MoreVertical className=" w-6 h-6" />
    </div>
  )
}
