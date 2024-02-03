import { Heart } from "lucide-react";
import UserInfo from "./user-info";


const BlogsPost = () => {
    return (
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
    );
};

export default BlogsPost;