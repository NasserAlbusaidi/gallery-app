import { useRouter } from "next/router";
import { db } from "../../firebase/clientApp";
import ImageGallery from 'react-image-gallery';

import {
  doc,
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
  getDoc,
} from "@firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { getDatabase } from "firebase/database";

export interface Album {
  title?: String;
  location?: String;
  date?: String;
  thumbnail?: String;
  photos?: String[];
}

function Album({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [albums, setAlbums] = useState<DocumentData>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  let count = 0;
  const handleNext = () => {
    
    count = (count + 1) % albums.photos?.length;
    setCurrentIndex(count);
    

  }
  const handlePrevious = () => {
    let count = 0;
    const length = albums.photos?.length;
    
    count = (currentIndex + length - 1) % length;
    setCurrentIndex(count);
    console.log("previous");
  }
  const slider = () => {
    setInterval(() => {
      handleNext();
    }, 10);
  }

  useEffect(() => {
    const getData = async () => {
      const docref = doc(db, "gallery", id);
      const docsnapshot = await getDoc(docref);
      if (docsnapshot.exists()) {
        const result: Album = docsnapshot.data();
        setAlbums(result);
        setLoading(false);
      } else {
        console.log("no data");
      }
    };
    slider();
    getData();
    
  }, [albums]);
  
  return (
    <div>
      <h1>Album</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-screen-xl m-auto">
      <div className="w-full relative select-none">
        <img src={albums.photos[currentIndex]} alt="" />

        <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={ handleNext }>Next</button>
        </div>
      </div>
    </div>
          
      )}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.params.id as string;

  return {
    props: {
      id,
    },
  };
}

export default Album;
