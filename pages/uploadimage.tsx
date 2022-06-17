import { useEffect, useState, useRef } from "react";
import { storage, firestore } from '../firebase/clientApp';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {setDoc, doc} from "@firebase/firestore";
import { getDatabase, set, ref as refre} from "firebase/database";


const uploadImage = () => {

    const [image, setImage] = useState<File[]>([]);
    const [title, setTitle] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [photos, setPhotos] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const handleChange = ({currentTarget: {files},}: React.ChangeEvent<HTMLInputElement>) => {
        if (files && files.length > 0) {
            setImage((prevState) =>  prevState.concat(Array.from(files))); 
        }
        }
        
    const uploading = () => {
        
        console.log('image is: ' + image);
        if (image) {
            console.log(image);
            image.forEach(async (file) => {
                const fileName = file.name;
                const fileRef = ref(storage, `images/${fileName + Date.now()}`);
                uploadBytes(fileRef, file)
                    .then(async () => {
                        console.log('uploaded');
                        setPhotos( (prevPhotos) => [...prevPhotos,  await getDownloadURL(fileRef)]);
                        // setPhotos(...[await getDownloadURL(fileRef)])
                        console.log(await getDownloadURL(fileRef));
                    })
                })
            }
    }
    useEffect(() => {
        const add = doc(firestore, `gallery/${Date.now()}`); 
        if(photos) {
            console.log(photos);
            // const data = {
            //     title : title,
            //     location : location,
            //     date : date,
            //     photos :{photos}
            // }
            // console.log(data);
            
        }     
        
       
        // setDoc(add, data)
    }), [photos]



    return (
        <div>
        <h1>Upload Image</h1>
            <label>name of the collection</label>
            <input type="text" onChange={(e)=> setTitle(e.target.value) } />
            <label>location</label>
            <input type="text"  onChange={(e)=> setLocation(e.target.value) } />
            <label>date</label>
            <input type="text"  onChange={(e)=> setDate(e.target.value) } />
            <label> Upload Image </label>
            <input type="file" name="image" onChange={ handleChange } multiple/>


            <button  onClick={ uploading } >Upload</button>
        
        </div>
    );
}

export default uploadImage;