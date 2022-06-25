import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { db } from "../firebase/clientApp";
import {
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import GridGalleryCard from "./components/Grid";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Link from "next/link";

const Home: NextPage = () => {
  const galleryCollection = collection(db, "gallery");
  const [gallery, setGallery] = useState<QueryDocumentSnapshot<DocumentData>[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  const getGallery = async () => {
    const galleryQuery = query(galleryCollection);
    const querySanpshot = await getDocs(galleryQuery)

    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySanpshot.forEach((doc) => {
      result.push(doc);
    });
    setGallery(result);
  };

  useEffect(() => {
    getGallery();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="h-screen">
    <div className="container mx-auto">
      <Nav />
      </div>
      <div className="grid sm:grid-cols-4 gap-1 pb-8 ">
        {loading ? (
          <div>Loading...</div>
        ) : (
          
          gallery.map((doc) => {
            console.log(doc.id)
            return (
              <Link href={`/album/${doc.id}`} key={doc.id} >
                <a>
              <GridGalleryCard imageUrl={doc.data().thumbnail} />
              </a>
              </Link>
            );
          })
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
