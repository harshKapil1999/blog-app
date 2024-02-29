import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Intro() {
  return (
    <div className=" w-full min-h-screen flex flex-col sm:flex-row overflow-auto mb-4 md:mb-6 lg:mb-8">
        <div className="w-full h-full">
            <img 
            src="https://images.pexels.com/photos/4348078/pexels-photo-4348078.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Imagination"
            className="w-full h-auto object-cover"
            />
        </div>
        <div className="w-full p-10">
            <h1 className=" text-center text-xl md:text-2xl font-bold p-2 pt-2">My Thoughts</h1>
            <img 
                src="https://images.pexels.com/photos/250591/pexels-photo-250591.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="" 
                className="p-4 aspect-square object-cover"
            />
            <div className="p-2">
                <h1 className="text-center text-base md:text-xl font-semibold p-2">Elevate Your Thoughts, Embrace Your Reality</h1>
                <p className="text-sm md:text-base p-2">Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....</p>
            </div>
            <div className=" w-full flex items-center justify-center">
                <Link to="/blog" className="p-3 px-7 hover:text-red-700 outline outline-black" >All Posts</Link>
            </div>
            
        </div>
    </div>
  )
}
