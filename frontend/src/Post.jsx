import { useEffect, useRef, useState } from "react";
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

export default function Post() {
  const [cloudinaryResult, setCloudinaryResult] = useState({});
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

  })
  useEffect(() => {
    urlRef.current = cloudinaryResult.url
  }, [cloudinaryResult])

  const handleChange = (e) => {
   setFormData({...formData, [e.target.name]: e.target.value, imageUrl: urlRef.current})
   console.log(formData)
  }
  
  const handleSelectCategory = (value) => {
    setFormData({ ...formData, category: value})
    console.log(formData)
  }

  const handleSubmit = (e) => {
  e.preventDefault() 
  axios.post("http://localhost:3000/api/blog", formData)
    .then((response) => {console.log(response)})
    .catch((error) => console.log(error))
    .then(console.log("Request completed"));
  }
  return (
    <div className=" flex items-center justify-center flex-col p-4">
      <h1 className="text-2xl">Post</h1>
      <form className="flex flex-col w-full">
        
        <Label className="my-2">Title</Label>
        <Input name='title' className="mb-4" type='text' onChange={handleChange} />

        <Label className="my-2">Category</Label>
        <Select name="category" onValueChange={(value) => handleSelectCategory(value)} >
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
        </div>
        
        <Label className="my-2">Short Description</Label>
        <Textarea name='shortDescription' className="mb-4" onChange={handleChange} />

        <Label className="my-2">Description</Label>
        <Textarea name='description' className="mb-4" onChange={handleChange} />

        <Button type='submit' onClick={handleSubmit}>Post</Button>
      </form>
      

    </div>
  )
}
