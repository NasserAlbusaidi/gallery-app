
import { useRouter } from 'next/router'
import { db } from '../../firebase/clientApp';
import {
  doc,  
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
} from "@firebase/firestore";
import { useEffect, useState } from "react";



function album({id} : {id: string}) {
    const router = useRouter();
    const docId = router.query.id;
   const docref = doc(db, "gallery");
   

    return (
        <div>
            <h1>Album {docId}</h1>
        </div>
    );
}

export default album;