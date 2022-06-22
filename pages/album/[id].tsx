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

function album({ id }: { id: string }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [albums, setAlbums] = useState<DocumentData>([]);

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
    getData();
  }, [albums]);

  return (
    <div>
      <h1>Album</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        console.log(albums.photos),
           <ImageGallery items={albums.thumbnail} />
          
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

export default album;
