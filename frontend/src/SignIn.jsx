import { useState } from "react";
import { Button } from "./components/ui/button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "./redux/user/userSlice";
import GoogleAuth from "./components/google-auth";
import { toast } from "sonner"

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInStart());
    axios.post("http://localhost:3000/api/auth/signin", formData)
    .then((response) => {
      //console.log(response.status, response.data, response)
      dispatch(signInSuccess(response.data));
      toast("User Successfully Signed In")
      setTimeout(() => {
        navigate('/')
      }, 2000);
    })
    .catch((error) => {
      dispatch(signInFailure(error.message))
      toast(errorMessage)
      
    })
    //.then(console.log('request completed'))
  };

  

  return (
    <div className="flex items-start justify-center w-full min-h-screen flex-col md:flex-row">
      <div className="w-full p-10 items-center">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-2xl lg:text-3xl py-2 font-bold">Sign up to your account</h1>
          <p className=" font-semibold py-1">Not a member? <Link to="/signup" className=" text-blue-800 hover:text-blue-700">Sign up</Link></p>
          <form className="flex flex-col" onSubmit={handleSubmit} >
            <label htmlFor="" className="my-1">Email address</label>
              <input type="email" name="email" className="outline p-1 mb-4 rounded-sm" onChange={handleChange} required/>
            
            <label htmlFor="" className="my-1">Password</label>
              <input type="password" name="password" className="outline p-1 mb-4 rounded-sm" onChange={handleChange} required/>

            <Button className="my-4" type="submit" disabled={loading}>Sign in</Button>
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
