import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import UserInfo from "./components/user-info";
import { Heart, Send, Share2Icon, Trash2, XCircle } from "lucide-react";

import parse from "html-react-parser";
import { Button } from "./components/ui/button";
import { useSelector } from "react-redux"

export default function SelectedBlog() {
    const {blogId} = useParams();
    let location = useLocation();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({});
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [views, setViews] = useState(0);

    const [comments, setComments] = useState([]);

    const [formData, setFormData] = useState({
      comment: '',
      user: '',
      blogId: ''
    })
    const {currentUser} = useSelector(state => state.user);
    
    useEffect(() => {
        axios.get(`http://localhost:3000/api/blog/${blogId}`)
            .then((response) => {
              console.log(response)
                const data = response.data;
                setBlog(data);
               setViews(perv => perv + 1); 
               setComments(data.comments);
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
         // console.log(response)
          toast(response.data.message)
        })
        .catch((error) => {
         // console.log(error)
          toast(error);
        })
      
        setTimeout(() => {
          navigate(`/blog`);
        }, 3000);
    }
    }
    

    const handleLike = () => {
      if (!currentUser) {
        return toast("Sign in to like the post");
      }
        setLiked((prev) => !prev)
      if (blog._id) {
        
      if (liked) {
        setLikes(prev => prev - 1);
        
      }
      else {
       setLikes(prev => prev + 1);
      }
      setFormData({...formData, likes: likes});
      
      console.log(likes)
      console.log(formData);
      }

    }
    
    //console.log(formData);
    const handleCommentChange = (e) => {

      setFormData({...formData, comment: e.target.value, user: currentUser._id, blogId: blogId }, )
      
    }

    const handleUpdateComments = () => {
      if(!currentUser) return toast("Login first to comment on the post");
      //console.log(formData);

      axios.post(`http://localhost:3000/api/blog/${blogId}/comment`, formData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })

    }
    console.log(comments);
    

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
                  <Heart fill="red" className=" w-6 h-6 cursor-pointer" onClick={handleLike}/>
                </span>
                
              </div>
            </div>
            
        </div>
        <div className="my-8 w-full max-w-4xl flex-col items-center justify-center m-auto">
         <div className="w-full border p-8 px-10 flex flex-col">
          <h1 className=" w-full my-2 text-3xl">Comments</h1>
          <hr className="my-2"/>
          <input name="comment" type="text" className="w-full p-3 my-2 border" onChange={handleCommentChange} />
            <div className="flex">
              <Button variant="ghost" className="w-fit" onClick={handleUpdateComments}><Send className=" w-6 h-6 "/></Button>
              <Button variant="ghost" className="w-fit"><XCircle className=" w-6 h-6 "/></Button>
            </div>
          {/* {comments.map((c, index) => (
            <div key={index} className="flex w-full">
            <div className="flex">
              <img src={c.user.avatar} alt="User Image" />
              <p>{c.user.name}</p>
            </div>
            <div className="flex flex-col">
              <p>{c.comment}</p>
              <p>{c.createdAt}</p>
            </div>
            
          </div>
          ))} */}
          
         </div>
        </div>
       
    </div>
  )
}
