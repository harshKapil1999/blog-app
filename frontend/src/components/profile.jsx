import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { toast } from "sonner";

const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    //console.log(currentUser)
    
    const [formData, setFormData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        avatar: currentUser.avatar,
        
    })
    
    const handleChange = (e) => {
        setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
        //console.log(formData)
    }

    const handleSubmit = (e) => {
        console.log(formData)
        e.preventDefault()
        axios.patch(`http://localhost:3000/api/user/${currentUser._id}`, formData)
        .then((response) => {
            console.log(response)
            const user = response.data.rest;
            toast(response.data.message);
            setFormData({
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                
            });
        })
        .catch((error) => {
            console.log(error)
            toast(error.message);
        });
    }

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col items-center max-w-md w-full">
               <h1 className="text-2xl p-2 mr-auto">Profile</h1>
               <img src={formData.avatar} name="avatar" alt={formData.name} className="h-20 w-20 rounded-full"/>
               
                <label htmlFor="" className="my-1 w-full">Name</label>
                <input type="text" name="name" className="outline p-1 mb-4 w-full rounded-sm" value={formData.name} onChange={handleChange} />
                
                <label htmlFor="" className="my-1 w-full">Email address</label>
                <input type="text" name="email" className="outline p-1 mb-4 rounded-sm w-full" value={formData.email} onChange={handleChange } />
                
                <label htmlFor="" className="my-1 w-full">Old Password</label>
                <input type="text" name="oldPassword" className="outline p-1 mb-4 rounded-sm w-full" onChange={handleChange } />

                <label htmlFor="" className="my-1 w-full">New Password</label>
                <input type="text" name="newPassword" className="outline p-1 mb-4 rounded-sm w-full" onChange={handleChange } />
                <Button onClick={handleSubmit}>Update</Button>
                
                
            </div>
            <div className=" flex flex-col items-center max-w-md w-full my-4">
                <h2 className=" text-xl my-2 w-full">Manage Account</h2>
                <Button variant="destructive" className="mr-auto">Delete Account</Button>

            </div>
            
        </div>
    );
};

export default Profile;