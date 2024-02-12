import { Link, useNavigate } from "react-router-dom";
import UserInfo from "./components/user-info";
import { Heart, PlusCircle } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";



export default function Blog() {
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState([]);
  const [views, setViews] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/api/blog')
    .then((response) => {
      //console.log(response)

      const data = response.data
      setAllBlogs(data);
      
    })
    .catch((error) => toast(error.message))

  }, [])

  //console.log(allBlogs) 
  const handleUpdate = () => { 
      setViews((prev) => prev+1);
      console.log(views)
  }

  return (
    
    <div className="w-full min-h-screen flex flex-col ">
      <div className="w-full max-w-4xl items-center justify-center mx-auto">
        <div className="w-full flex items-center justify-between">
          <nav className=" ">
            <h1 className="text-3xl font-bold p-2">Blog</h1>
            <p className=" text-muted-foreground text-sm p-2">All Posts</p>
          </nav>
            <Link to="/post" className="p-2 outline hover:scale-105 hover:text-red-700 hover:outline-red-800 flex items-center">
             <PlusCircle className="h-6 w-6 p-1" /> Create Blog
            </Link>
        </div>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {allBlogs.map((blog, index) => (
            <div key={index} className="w-full border cursor-pointer" onClick={() => navigate(`/blog/${blog._id}`)}>
            <img 
              src={blog.imageUrl} 
              alt={blog.title}
              className="w-full aspect-[4/3]  object-cover"
            />
            <div className=" w-full p-4 md:pb-8">

              <UserInfo createdAt={blog.createdAt} name={blog.creator.name} avatar={blog.creator.avatar}/>
              <div className="hover:text-red-700">
              <h2 className="text-xl font-bold p-2">{blog.title}</h2>
              <p className="text-sm md:text-base p-2 ">{blog.shortDescription.length > 100 ? (blog.shortDescription.substring(0, 150) + '...') : (blog.shortDescription)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between m-4 p-2 border-t">
              <p className=" text-xs ">{blog.views}</p>
              <span className=" flex items-center justify-center">
                <p className="p-1 text-xs">{blog.likes}</p>
                <Heart className=" w-6 h-6" />
              </span>
              
            </div>
          </div>
          ))
          
          }

        </div>
      </div>
      
    </div>
  )
}
