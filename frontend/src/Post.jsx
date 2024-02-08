import { useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UploadWidget from "./components/upload-widget";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import axios from "axios";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";
import { useSelector } from "react-redux"

export default function Post() {
  const [cloudinaryResult, setCloudinaryResult] = useState({});
  const {currentUser} = useSelector(state => state.user);
  //console.log(cloudinaryResult.url)
  const urlRef = useRef();
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    shortDescription: "",
    description: "",
    category: "",
    likes: 0,
    views: 0,
    userId: currentUser._id,
  })
  useEffect(() => {
    urlRef.current = cloudinaryResult.secure_url
  }, [cloudinaryResult])

  const handleChange = (e) => {
   setFormData({...formData, [e.target.name]: e.target.value, imageUrl: urlRef.current})
   console.log(formData)
  }
  
  const handleSelectCategory = (value) => {
    setFormData({ ...formData, category: value})
    console.log(formData)
  }

  const handleBlogDescription = (value) => {
    setFormData({ ...formData, description: value })
    console.log(formData)
  }

  const handleSubmit = (e) => {
  e.preventDefault() 
  axios.post("http://localhost:3000/api/blog", formData)
    .then((response) => {
      //console.log(response)
      const data = response.data;
      toast(data.message);

    })
    .catch((error) => toast(error.message)
      //console.log(error) 
    )
   // .then(console.log("Request completed"));
  }
  return (
    <div className=" flex items-center justify-center flex-col p-4 w-full">
      <h1 className="text-2xl">Post</h1>
      <form className="flex flex-col w-full max-w-3xl">
        
        <Label className="my-2">Title</Label>
        <Input name='title' className="mb-4" type='text' onChange={handleChange} required/>

        <Label className="my-2">Category</Label>
        <Select name="category" onValueChange={(value) => handleSelectCategory(value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="fitness">Fitness</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="food and recipe">Food and Recipe</SelectItem>
            <SelectItem value="lifestyle">Lifestyle</SelectItem>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="love and relationships">Love and Relationships</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-full flex my-4 items-center gap-4">
          <Label className="">Thumbnail Image</Label>
          <UploadWidget className=" w-full" setCloudinaryResult={setCloudinaryResult}/>
          {urlRef.current ? (
          <img src={urlRef.current} alt="preview image" className="w-[35dvw] h-auto min-h-[25dvw]"/>
          ): (
           <div className="w-[35dvw] h-auto min-h-[25dvw] flex items-start justify-center bg-slate-600">
            <h1 className="m-auto text-2xl text-white">Preview Image</h1>
           </div>
          )}
          
        </div>
        
        <Label className="my-2">Short Description</Label>
        <Textarea name='shortDescription' className="mb-4" onChange={handleChange} required/>

        <div className=" flex flex-col my-2 min-h-[60dvh] ">
        <Label className="my-2">Description</Label>
       {/*  <Textarea name='description' className="mb-4" onChange={handleChange} /> */}
        <ReactQuill theme="snow" className=" w-full h-[46dvh]" onChange={(value) => handleBlogDescription(value)} required/>

       
        </div>
         <Button type='submit' className=" mt-2" onClick={handleSubmit}>Post</Button>
      </form>
    </div>
  )
}
