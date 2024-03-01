import { Send, XCircle } from "lucide-react";
import { Button } from "./ui/button";

import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Comments({ blogId }) {
    const {currentUser} = useSelector(state => state.user);
    const [comments, setComments] = useState([]);
    const [formData, setFormData] = useState({
        comment: '',
        user: '',
        blogId: ''
      });

    function getTime(time) {
       const convertedTime = new Date(time).toLocaleDateString('en-US', {  
            hour: '2-digit',
            day:   'numeric',
            month: 'short',
            year:  'numeric',
        })
        return convertedTime;
      }
      

      useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/comment/${blogId}`)
            .then((response) => {
                //console.log(response);
                setComments(response.data);
            })
            .catch((error) => {
                toast(error.message);
                //console.log(error);
            })
      }, [blogId]);

    const handleCommentChange = (e) => {

        setFormData({...formData, comment: e.target.value, user: currentUser._id, blogId: blogId }, )
        
      }

    const handleUpdateComments = () => {
        if(!currentUser) return toast("Login first to comment on the post");
        //console.log(formData);
  
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/comment`, formData)
          .then((response) => {
            toast(response.data.message);
            //console.log(response);
          })
          .catch((error) => {
            toast(error.message)
            //console.log(error);
          });
  
      }
    
    const handleDeleteComment = (commentId) => {
        if(!currentUser) return toast("Unauthorized! You can not delete this comment!");

        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/comment/${commentId}`)
        .then((response) => {
            //console.log(response)
            toast(response.data.message)
        })
        .catch((error) => {
            //console.log(error)
            toast(error.message)
        });
    }

  return (
    <div className="my-8 w-full max-w-4xl flex-col items-center justify-center m-auto">
         <div className="w-full border p-8 px-10 flex flex-col">
          <h1 className=" w-full my-2 text-3xl">Comments</h1>
          <hr className="my-2"/>
          <form method="post" onSubmit={e => {e.preventDefault()}}>
            <input name="comment" type="text" className="w-full p-3 my-2 border" minLength={3} onChange={handleCommentChange} required/>
            <div className="flex">
              <Button variant="ghost" type="submit" className="w-fit" onClick={handleUpdateComments}><Send className=" w-6 h-6 "/></Button>
            </div>
          </form>
          
            {comments.length > 0 &&
            <div className=" border p-4 my-4 grid grid-cols-1 gap-3">
                {comments.map((c, index) => (
                    <div key={index} className="flex flex-col w-full gap-4 bg-gray-100 p-4">
                        <div className="flex items-center justify-between">
                            <div className="w-full flex items-center gap-2 text-muted-foreground ">
                                <img src={c.user.avatar} alt="User Image" className="h-6 w-6 rounded-full"/>
                                <div className="flex flex-col">
                                    <p className=" font-semibold text-sm">{c.user.name}</p>
                                    <p className=" text-xs">{getTime(c.createdAt)}</p>
                                </div>  
                            </div>
                            {((currentUser && c.user) && currentUser._id === c.user._id) && 
                            <Button variant="ghost" className="w-fit hover:bg-slate-50 hover:text-red-700" 
                            onClick={() => handleDeleteComment(c._id)}><XCircle className=" w-6 h-6 "/></Button> 
                              }
                        </div>
                        <div className="flex items-center">
                            <p>{c.comment}</p>
                        </div>
                    
                    </div>
                ))} 
            </div>}
          
          
         </div>
    </div>
  )
}
