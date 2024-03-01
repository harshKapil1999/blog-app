import axios from "axios";
import GoogleAuth from "./components/google-auth";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { toast } from "sonner"

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const nevigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, formData)
    .then((response) => {
      //console.log(response.status, response.data, response)
      toast("User Successfully Signed Up.")
      setTimeout(() => {
        nevigate("/signin")
      }, 2000);
    })
    .catch((error) => {
      //console.log(error)
      toast(error.message)
    })
    //.then(console.log("request Completed"))
  };

  return (
    <div className="flex items-start justify-center w-full min-h-screen flex-col md:flex-row">
      <div className="w-full p-10 items-center">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-2xl lg:text-3xl py-2 font-bold">Sign in to your account</h1>
          <p className=" font-semibold py-1">Already a member? <Link to="/signin" className=" text-blue-800 hover:text-blue-700">Sign in</Link> to your account.</p>
          <form className="flex flex-col" onSubmit={handleSubmit} method="post">
          <label htmlFor="" className="my-1">Name</label>
              <input type="text" name="name" className="outline p-1 mb-4 rounded-sm" onChange={handleChange} required/>
           
            <label htmlFor="" className="my-1">Email address</label>
              <input type="email" name="email" className="outline p-1 mb-4 rounded-sm" onChange={handleChange } required/>
            
            <label htmlFor="" className="my-1">Password</label>
              <input type="password" name="password" className="outline p-1 mb-4 rounded-sm"  onChange={handleChange } required/>
            

            <Button className="my-4" type="submit">Sign up</Button>
            <div className="w-full flex items-center justify-center">
              <hr className="w-full"/>
              <p className="w-full mx-auto flex items-center justify-center">Or continue with</p>
              <hr className="w-full"/>
            </div>
            <GoogleAuth />
          </form>
      </div>
      </div>
      <div className=" w-full">
        <img 
          src="https://images.pexels.com/photos/7778869/pexels-photo-7778869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Sign in" 
        />
      </div>
    </div>
  )
}
