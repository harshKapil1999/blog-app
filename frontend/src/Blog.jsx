import { Link, useNavigate } from "react-router-dom";
import UserInfo from "./components/user-info";
import { Heart, PlusCircle } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./components/ui/button";

/* Todo Render blogs in recent order, Apply filters according to blog categories */

export default function Blog() {
  const navigate = useNavigate();
  const [allBlogs, setAllBlogs] = useState([]);
  let categories = ["all", "business", "entertainment", "general", "health", "science", "sports", "technology", "politics", "software", "fitness", "food and recipe", "lifestyle", "finance", "travel", "education", "music", "movies", "comedy", "love and relationships"];

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blog`)
    .then((response) => {
      //console.log(response)

      const data = response.data
      setAllBlogs(data.reverse());
      
    })
    .catch((error) => toast(error.message))

  }, [])

  //console.log(allBlogs) 
  const handleSelectCategory = (category) => {
    //console.log(category);
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blog/category/${category}`)
      .then((response) => {
        //console.log(response)
        const data = response.data
        setAllBlogs(data.reverse());
      })
      .catch((error) => toast(error.message))
  }

  return (
    
    <div className="w-full min-h-screen flex flex-col p-2">
      <div className="w-full max-w-4xl items-center justify-center mx-auto">
        <div className="w-full flex flex-col">
          <h1 className="text-3xl font-bold p-2">Blogs</h1>
          <nav className="flex flex-col items-center w-full my-8">
            <p className=" text-muted-foreground text-sm p-2">All Posts</p>
            <Link to="/post" className="w-full max-w-md flex items-center justify-center p-2 outline hover:scale-105 hover:text-red-700 hover:outline-green-700 transition-transform">
             <PlusCircle className="h-6 w-6 p-1" /> Post a new Blog
            </Link>
          </nav>
          <ul className="flex w-full flex-wrap">
            {categories.map((category, index) => (
              <li key={index} className="text-sm p-2 hover:text-red-700">
                <Button variant="ghost" size="sm" onClick={() => handleSelectCategory(category)} >{category}</Button>
              </li>
            ))}
          </ul>  
        </div>
        {allBlogs.length === 0 ? (
            <div className="w-full border min-h-screen flex items-center justify-center">
              <h1 className=" text-3xl font-bold">No blogs found with the selected category</h1>
            </div>
          ) : (
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {allBlogs.map((blog, index) => (
            <div key={index} className="w-full border " >
              <div className="w-full cursor-pointer" onClick={() => navigate(`/blog/${blog._id}`)}>
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
              </div>
              <div className="flex items-center justify-between m-4 p-2 border-t text-muted-foreground">
                <p className=" text-xs ">{blog.views?.length} views</p>
                <span className=" flex items-center justify-center">
                  <p className="p-1 text-xs">{blog.likes?.length}</p>
                  <Heart fill="red" className="text-red-500 w-6 h-6" />
                </span>
                
              </div>
          </div>
          )) 
          }
        </div> )
          }
      </div>
      
    </div>
  )
}
