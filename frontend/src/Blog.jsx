import { Link } from "react-router-dom";
import UserInfo from "./components/user-info";
import { Heart } from "lucide-react";



export default function Blog() {
  return (
    
    <div className="w-full min-h-screen flex flex-col ">
      <div className="w-full max-w-4xl items-center justify-center mx-auto">
        <div className="w-full flex items-center justify-between">
          <nav className=" ">
            <h1 className="text-3xl font-bold p-2">Blog</h1>
            <p className=" text-muted-foreground text-sm p-2">All Posts</p>
          </nav>
            <Link to="/signin" className="p-2 outline text-red-700 outline-red-800">Log in / Sign up</Link>
        </div>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full border">
            <img 
              src="https://images.pexels.com/photos/3771055/pexels-photo-3771055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="post"
              className="w-full aspect-[4/3]  object-cover"
            />
            <div className=" w-full p-4 md:pb-8">
              <UserInfo />
              <h2 className="text-xl font-bold p-2">The one thing I would tell to my 16 year old self</h2>
              <p className="text-sm md:text-base p-2">Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....</p>
            </div>
            <div className="flex items-center justify-between m-4 p-2 border-t">
              <p className=" text-xs ">4 views</p>
              <span className=" flex items-center justify-center">
                <p className="p-1 text-xs">2</p>
                <Heart className=" w-6 h-6" />
              </span>
              
            </div>
          </div>
          <div className="w-full border">
            <img 
              src="https://images.pexels.com/photos/12403076/pexels-photo-12403076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="post"
              className="w-full aspect-[4/3]  object-cover"
            />
            <div className=" w-full p-4 md:pb-8">
              <UserInfo />
              <h2 className="text-xl font-bold p-2">The one thing I would tell to my 16 year old self</h2>
              <p className="text-sm md:text-base p-2">Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....</p>
            </div>
            <div className="flex items-center justify-between m-4 p-2 border-t">
              <p className=" text-xs ">4 views</p>
              <span className=" flex items-center justify-center">
                <p className="p-1 text-xs">2</p>
                <Heart className=" w-6 h-6" />
              </span>
              
            </div>
          </div>
          <div className="w-full border">
            <img 
              src="https://images.pexels.com/photos/12403076/pexels-photo-12403076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="post"
              className="w-full aspect-[4/3]  object-cover"
            />
            <div className=" w-full p-4 md:pb-8">
              <UserInfo />
              <h2 className="text-xl font-bold p-2">The one thing I would tell to my 16 year old self</h2>
              <p className="text-sm md:text-base p-2">Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....</p>
            </div>
            <div className="flex items-center justify-between m-4 p-2 border-t">
              <p className=" text-xs ">4 views</p>
              <span className=" flex items-center justify-center">
                <p className="p-1 text-xs">2</p>
                <Heart className=" w-6 h-6" />
              </span>
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}
