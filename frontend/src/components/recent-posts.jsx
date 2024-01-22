

export default function RecentPosts() {
  return (
    <div className="w-full min-h-screen flex justify-center">
        <div className=" max-w-4xl flex flex-col ">
            <h1 className="text-2xl md:text-3xl lg:4xl font-bold p-4 py-8">Recent Posts</h1>
            <div className=" w-full flex flex-col md:flex-row">
                <div className="w-full">
                    <img 
                        src="https://images.pexels.com/photos/3771055/pexels-photo-3771055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="post"
                        className="w-full aspect-[4/3]  object-cover"
                    />
                </div>
                <div  className="w-full p-4 mx-10">
                    <p>Jan 4, 2024</p>
                    <div className="border-b py-6">
                    
                    <h2 className="font-bold py-2 text-xl">Cant stop scrolling through your friends&apos; feed?</h2>
                    <p className="py-2">Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....</p>
                    </div>
                    <p>0 comments </p>
                </div>
            </div>
        </div>
    </div>
  )
}
