import { useEffect, useState, useRef } from "react";
import { storage, firestore } from "../firebase/clientApp";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setDoc, doc, collection } from "@firebase/firestore";
import { getDatabase, set, ref as refre } from "firebase/database";

const uploadImage = () => {
  const [image, setImage] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [photos, setPhotos] = useState<string[]>([]);

  const handleChange = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length > 0) {
      setImage((prevState) => prevState.concat(Array.from(files)));
    }
  };

  const uploading = () => {
    if (image) {
      image.forEach(async (file) => {
        const fileName = "filename";
        const fileRef = ref(storage, `images/${fileName + Date.now()}`);
        uploadBytes(fileRef, file).then(async (snapshot) => {
          console.log("uploaded");
          const downloadURL = await getDownloadURL(snapshot.ref);
          console.log("File available at", downloadURL);
          setPhotos((prevState) => [...prevState, downloadURL]);
        });
      });
    }
  };

  const handleSubmit = () => {
   
    const data = {
      title: title,
      location: location,
      date: date,
      photos: photos,
    };
    const docref = doc(collection(firestore, "gallery"));
    setDoc(docref, data).then(() => {
        console.log("Document written with ID: ", docref.id);
    })
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <label>name of the collection</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} />
      <label>location</label>
      <input type="text" onChange={(e) => setLocation(e.target.value)} />
      <label>date</label>
      <input type="text" onChange={(e) => setDate(e.target.value)} />
      <label> Upload Image </label>
      <input type="file" name="image" onChange={handleChange} multiple />

      <button onClick={uploading}>Upload</button>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
};

export default uploadImage;
