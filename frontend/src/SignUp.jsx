import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import axios from "axios";
import { useState } from "react";


export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [response, setResponse] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    console.log(userData)
    axios.post("http://localhost:3000/api/user/signup", userData)
    .then((response) => {
      console.log(response.status, response.data, response)
      setResponse("User Successfully Signed In")
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
              <input type="text" name="name" className="outline p-1 mb-4 rounded-sm" value={name} onChange={(e) => setName(e.target.value)} required/>
            <label htmlFor="" className="my-1">Email address</label>

              <input type="text" name="email" className="outline p-1 mb-4 rounded-sm" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            
            <label htmlFor="" className="my-1">Password</label>
              <input type="text" name="password" className="outline p-1 mb-4 rounded-sm" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            

            <Button className="my-4" type="submit">Sign up</Button>
            <div className="w-full flex items-center justify-center">
              <hr className="w-full"/>
              <p className="w-full mx-auto flex items-center justify-center">Or continue with</p>
              <hr className="w-full"/>
            </div>
            <Button className="my-4 mx-auto px-14" variant="outline" >
            <svg className=" w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="2443" height="2500" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
              Google</Button>
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
