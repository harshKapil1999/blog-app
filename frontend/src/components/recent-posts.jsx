import axios from "axios"
import { useEffect, useState } from "react"
import UserInfo from "./user-info";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function RecentPosts() {
    const navigate = useNavigate();

    const [recentBlogs, setRecentBlogs] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blog`)
            .then((response) => { 
                //console.log(response)
                const data = response.data;
                const selectedBlogs = data.slice(data.length -3, data.length);
                //console.log(selectedBlogs.reverse());
                setRecentBlogs(selectedBlogs.reverse());
            })
            .catch((error) => {
                //console.log(error)
                toast(error.message);
            })
    }, [])

  return (
    <div className="w-full min-h-screen flex justify-center">
        <div className=" max-w-4xl flex flex-col ">
            <h1 className="text-2xl md:text-3xl lg:4xl font-bold py-8">Recent Posts</h1>
            <div className=" grid gap-8">
                {recentBlogs.map((blog, index) => (
                <div key={index} className=" w-full flex flex-col md:flex-row">
                    <div className="w-full cursor-pointer" onClick={() => {navigate(`/blog/${blog._id}`)}}>
                        <img 
                            src={blog.imageUrl} 
                            alt="Recent Blog Image"
                            className="w-full aspect-[4/3]  object-cover"
                        />
                    </div>
                    <div  className="w-full p-4 px-10">
                        {blog.creator && <UserInfo createdAt={blog.createdAt} name={blog.creator.name} avatar={blog.creator.avatar}/>}
                        <div className="border-b py-6 hover:text-red-700 cursor-pointer" onClick={() => {navigate(`/blog/${blog._id}`)}}>
                        
                            <h2 className="font-bold py-2 text-xl">{blog.title}</h2>
                            <p className="py-2">{blog.shortDescription.length > 100 ? (blog.shortDescription.substring(0, 150) + '...') : (blog.shortDescription)}</p>
                        </div>
                        <p>comments ... </p>
                    </div>
                </div>))
                }
            </div>
        </div>
    </div>
  )
}
