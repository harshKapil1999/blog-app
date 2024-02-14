import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import UserInfo from "./components/user-info";
import { Heart, Share2Icon, Trash2 } from "lucide-react";

import parse from "html-react-parser";
import { Button } from "./components/ui/button";
import { useSelector } from "react-redux"

export default function SelectedBlog() {
    const {blogId} = useParams();
    let location = useLocation();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({});
    const {currentUser} = useSelector(state => state.user);
    
    useEffect(() => {
        axios.get(`http://localhost:3000/api/blog/${blogId}`)
            .then((response) => {
              //console.log(response)
                const data = response.data;
                setBlog(data);
                
            })
            .catch((error) => {toast(error.message)})
    }, [blogId]);

    const handleShare = () => {
      const pathname = location.pathname;
      
      navigator.clipboard.writeText(`http://localhost:5173${pathname}`);
      toast(`Copyed to Clipboard ! http://localhost:5173${pathname}`);
    }

    const handleDelete = () => {
      if(currentUser && blog.creator) {
        if( currentUser._id !== blog.creator._id){
          return toast("Unauthoriged! Only authorized creator can delete blog.");
        }

        toast("Authorized! You can delete this blog")

        axios.delete(`http://localhost:3000/api/blog/${blogId}`)
        .then((response) => {
          console.log(response)
          toast("Blog is deleted successfully!")
        })
        .catch((error) => {
          console.log(error)
          toast(error);
        })
      
        setTimeout(() => {
          navigate(`/blog`);
        }, 5000);
    }
    }
    

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full my-8 flex items-center justify-between">
          <Link to={'/blog'} className="text-muted-foreground p-2">All Blogs</Link>
          {!currentUser &&
          <Link to="/signup" className="p-2 outline hover:scale-105 hover:text-red-700 hover:outline-red-800 flex items-center">
           Sign up / Sign in
         </Link>
         }
          
        </div>
        <div className="max-w-4xl w-full border flex flex-col items-center justify-center m-auto">
            <div className=" w-full max-w-3xl flex flex-col items-center justify-center m-auto my-10">
              <div className="flex flex-col w-full">
                {blog.creator && <UserInfo createdAt={blog.createdAt} name={blog.creator.name} avatar={blog.creator.avatar}/>}
                  <nav className=" w-full flex items-center justify-between">
                    <Button variant="ghost" className="rounded-full bg-gray-200">{blog.category}</Button>
                    <div className="flex items-center justify-center">
                      <Button variant="ghost" onClick={handleShare}><Share2Icon className=" w-6 h-6"/></Button>
                      {currentUser && <Button variant="ghost" onClick={handleDelete}><Trash2 className=" w-6 h-6"/></Button>}
                    </div>
                    
                    
                  </nav>
                  <h1 className="text-3xl md:text-5xl my-6">{blog.title}</h1>
              </div>
              <img src={blog.imageUrl} alt="Blog Image" className=" w-full aspect-[4/3] object-cover my-4" /> 
              <div className="my-6">
                  <div>{parse(`${blog.description}`)}</div>
              </div>
              <div className="w-full flex items-center justify-between m-4 p-2 border-t text-muted-foreground">
                <p className=" text-xs ">{blog.views} views</p>
                <span className=" flex items-center justify-center">
                  <p className="p-1 text-xs">{blog.likes}</p>
                  <Heart fill="red" className=" w-6 h-6" />
                </span>
                
              </div>
            </div>
            
        </div>
       
    </div>
  )
}
