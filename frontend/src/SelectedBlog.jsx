import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import UserInfo from "./components/user-info";
import { Heart, Share2Icon, Trash2 } from "lucide-react";

import parse from "html-react-parser";
import { Button } from "./components/ui/button";
import { useSelector } from "react-redux"
import Comments from "./components/comments";

export default function SelectedBlog() {

    const {currentUser} = useSelector(state => state.user);

    const {blogId} = useParams();
    let location = useLocation();
    const navigate = useNavigate();

    const [blog, setBlog] = useState({});
    const [likes, setLikes] = useState(0);
    //const [isLiked, setIsLiked] = useState(false);
    const [views, setViews] = useState(0);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blog/${blogId}`)
            .then((response) => {
              //console.log(response)
                const data = response.data;
                setBlog(data); 
                setLikes(data.likes.length);
                setViews(data.views.length);
            })
            .catch((error) => {toast(error.message)})
            .finally(() => handleUpdateViews());

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

        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/blog/${blogId}`)
        .then((response) => {
         //console.log(response)
          toast(response.data.message)
        })
        .catch((error) => {
         //console.log(error)
          toast(error);
        })
      
        setTimeout(() => {
          navigate(`/blog`);
        }, 3000);
    }
    }
    
    const handleUpdateLikes = (userId) => {
      if(!userId) return toast("Signup first to like the blog.");

      //setIsLiked(prev => !prev);

      /* if (isLiked) {
        setLikes(prev => prev -1);
      } else {
        setLikes(prev => prev + 1);} */
        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/blog/likes/${blogId}`, {userId})
            .then((response) => {
              //console.log(response);
              setLikes(response.data.likedBlog.likes.length);
            })
            .catch((error) => {
              toast(error.message)
              //console.log(error);
            })
      
        //console.log(userId, isLiked, likes);
    }
    
    const handleUpdateViews = () => {
      if(!currentUser._id) {
        return toast("Sign in to update the views!");
      } 
        else {
          const userId = currentUser._id;
          axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/blog/views/${blogId}`, {userId})
            .then((response) => {
              const data = response.data;
              setViews(data.viewedBlog.views.length);
            })
            .catch((error) => {
              //console.log(error);
              toast(error.message)
            })
        }
    }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-2">
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
                      {((currentUser && blog.creator) && currentUser._id === blog.creator._id) &&  <Button variant="ghost" onClick={handleDelete}><Trash2 className=" w-6 h-6"/></Button>}
                    </div>
                    
                    
                  </nav>
                  <h1 className="text-3xl md:text-5xl my-6">{blog.title}</h1>
              </div>
              <img src={blog.imageUrl} alt="Blog Image" className=" w-full aspect-[4/3] object-cover my-4" /> 
              <div className="my-6">
                  <div>{parse(`${blog.description}`)}</div>
              </div>
              <div className="w-full flex items-center justify-between m-4 p-2 border-t text-muted-foreground">
                <p className=" text-xs ">{views} views</p>
                <span className=" flex items-center justify-center">
                  <p className="p-1 text-xs">{likes}</p>
                  <Button variant='ghost' onClick={() => handleUpdateLikes(currentUser._id)}>
                    <Heart fill="red" className=" w-6 h-6 text-red-700" />
                  </Button>
                  
                </span>
                
              </div>
            </div>
            
        </div>
        <Comments blogId={blogId} />
       
    </div>
  )
}
