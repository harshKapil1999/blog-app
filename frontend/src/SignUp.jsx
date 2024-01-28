import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import axios from "axios";
import { useState } from "react";
import GoogleAuth from "./components/google-auth";


export default function SignUp() {
  /* const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
   */

  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState("")
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/auth/signup", formData)
    .then((response) => {
      console.log(response.status, response.data, response)
      setResponse("User Successfully Signed Up")
    })
    .catch((error) => {console.log(error)})
    .then(console.log("request Completed"))
  };

  return (
    <div className="flex items-start justify-center w-full min-h-screen flex-col md:flex-row">
      <div className="w-full p-10 items-center">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-2xl lg:text-3xl py-2 font-bold">Sign in to your account</h1>
          <p className=" font-semibold py-1">Already a member? <Link to="/signin" className=" text-blue-800 hover:text-blue-700">Sign in</Link> to your account.</p>
          <form className="flex flex-col" onSubmit={handleSubmit} method="post">
          <label htmlFor="" className="my-1">Name</label>
              <input type="text" name="name" className="outline p-1 mb-4 rounded-sm" /* value={name} */ onChange={handleChange /* (e) => setName(e.target.value) */} required/>
            <label htmlFor="" className="my-1">Email address</label>

              <input type="text" name="email" className="outline p-1 mb-4 rounded-sm" /* value={email} */ onChange={handleChange /* (e) => setEmail(e.target.value) */} required/>
            
            <label htmlFor="" className="my-1">Password</label>
              <input type="text" name="password" className="outline p-1 mb-4 rounded-sm" /* value={password} */ onChange={handleChange /* (e) => setPassword(e.target.value) */} required/>
            

            <Button className="my-4" type="submit">Sign up</Button>
            <div className="w-full flex items-center justify-center">
              <hr className="w-full"/>
              <p className="w-full mx-auto flex items-center justify-center">Or continue with</p>
              <hr className="w-full"/>
            </div>
            <GoogleAuth />
          </form>
          <p className="text-2xl text-green-800 ">{response}</p>
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
