import { useEffect, useState, useRef } from "react";
import { storage, db } from "../firebase/clientApp";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setDoc, doc, collection } from "@firebase/firestore";
import { getDatabase, set, ref as refre } from "firebase/database";
import Router from "next/router";

const UploadImage = () => {
  const [image, setImage] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [photos, setPhotos] = useState<string[]>([]);


  const handleChange = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length > 0) {
      setImage((prevState) => prevState.concat(Array.from(files)));
    }
  };
  const handleSubmit = () => {
   
    const data = {
      title: title,
      location: location,
      date: date,
      category: category,
      thumbnail: photos[0],
      photos: photos,
    };
    const docref = doc(collection(db, "gallery"));
    setDoc(docref, data).then(() => {
        console.log("Document written with ID: ", docref.id);
        return Router.push("/");
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    })
  };

  var submitButtonProps = {
    disabled : true,
    className : "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-slate-300",
    onClick : handleSubmit


}
if(photos.length > 0 && title.length > 0 && location.length > 0 && date.length > 0 && category.length > 0){
    submitButtonProps.disabled = false;
}
  const uploading = () => {
    
    if (image) {
        setTimeout(() => {
            
        }, 1500);
        
      image.forEach(async (file) => {
        const folderName = title + "-" + location + "-" + date;
        const fileName = "filename";
        const fileRef = ref(storage, `images/${folderName}/${fileName + Date.now()}`);
        uploadBytes(fileRef, file).then(async (snapshot) => {
          console.log("uploaded");
          const downloadURL = await getDownloadURL(snapshot.ref);
          console.log("File available at", downloadURL);
          setPhotos((prevState) => [...prevState, downloadURL]);
          

          
        });
      });
    }
  };

  

  return (
    <div>
      <div className="w-full max-w-xs mx-auto py-[200px]">
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Title
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Location
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)}/>  
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Date
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline" id="password" type="date" placeholder="Location" onChange={(e) => setDate(e.target.value)}/>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        category
      </label>
      <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"   onChange={(e) => setCategory(e.target.value)} >
        <option value="">Select category</option>
        <option value="nature">nature</option>
        <option value="people">people</option>
        <option value="animals">animals</option>
        <option value="others">others</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" >
            Upload Image
        </label>
        <input className="block w-full text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none " type="file" multiple onChange={handleChange}/>
        </div>
    <div className="flex items-center justify-between">
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={uploading}>
        Upload Images
      </button>
      <button {...submitButtonProps} >
        Submit
      </button>
      
    </div>
  </div>
  
</div>
    </div>
  );
};

export default UploadImage;
