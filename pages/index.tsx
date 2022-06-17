import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { firestore } from '../firebase/clientApp'
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";
import { useEffect, useState } from 'react';




const Home: NextPage = () => {
  const galleryCollection = collection(firestore,'gallery');
const [gallery,setGallery] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
const [loading,setLoading] = useState<boolean>(true);


const getGallery = async () => {
    const galleryQuery = query(galleryCollection)
    const querySanpshot = await getDocs(galleryQuery);

    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySanpshot.forEach(doc => {
        result.push(doc);
    });
    setGallery(result);
}

useEffect(() => {
    getGallery();
    setTimeout(() => {
        setLoading(false);
    }
    ,1000);
},[]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Test</title>
      </Head>
      
        <div className={styles.gallery}>
            {loading ? <div>Loading...</div> :
            gallery.map(doc => {
                return (
                    <div className={styles.image}>
                <h1> {doc.data().title}  </h1>
                <h3> {doc.data().location} </h3>
                <h5> {doc.data().date} </h5>
                  </div>
                )
            }
            )
            }

    </div>
    </div>
  )
}

export default Home
