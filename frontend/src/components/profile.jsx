import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";

const Profile = () => {
    const { currentUser } = useSelector(state => state.user);
    //console.log(currentUser)
    
    const [formData, setFormData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        password: currentUser.name,
        avatar: currentUser.avatar,
        
    })
    
    const handleChange = (e) => {
        setFormData(prevState => ({...prevState, [e.target.name]: e.target.value}))
        console.log(formData)
    }

    const handleSubmit = (e) => {
        console.log(formData)
        e.preventDefault()
        axios.post("http://localhost:3000/", formData)
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
        .finally(console.log('request completed'));
    }

    return (
        <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center max-w-md w-full">
               <h1 className="text-2xl p-2">Profile</h1>
               <img src={formData.avatar} name="avatar" alt={formData.name} className="h-20 w-20 rounded-full"/>
               
                <label htmlFor="" className="my-1 w-full">Name</label>
                <input type="text" name="name" className="outline p-1 mb-4 w-full rounded-sm" value={formData.name} onChange={handleChange} />
                
                <label htmlFor="" className="my-1 w-full">Email address</label>
                <input type="text" name="email" className="outline p-1 mb-4 rounded-sm w-full" value={formData.email} onChange={handleChange } />
                
                <label htmlFor="" className="my-1 w-full">Password</label>
                <input type="text" name="password" className="outline p-1 mb-4 rounded-sm w-full" onChange={handleChange } />
                <Button onClick={handleSubmit}>Send</Button>
            </div>
            
            
        </div>
    );
};

export default Profile;