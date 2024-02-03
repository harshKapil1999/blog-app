import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

const UploadWidget = ({setCloudinaryResult}) => {
   
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    //console.log(import.meta.env.CLOUDINARY_CLOUD_NAME)
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        //console.log(cloudinaryRef.current);
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName:  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
            uploadPreset:  import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_NAME,
            
        }, function (error, result) {
            if (!error && result && result.event === "success") {
                console.log('Done! Here is the image info: ', result.info); 
                setCloudinaryResult(result.info);
              }
            /* console.log(error);
            console.log("", result); */
        })

    }, [])

    return (
        <Button type='button' onClick={() => widgetRef.current.open()}>
            Upload
        </Button>  
    );
};

export default UploadWidget;