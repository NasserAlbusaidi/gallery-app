// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

type Data = {
  name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const storage = getStorage()
  const starsref = ref(storage, 'images/stars.jpg');

    getDownloadURL(starsref)
    .then((url) => {
      // Insert url into an <img> tag to "download"
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
          // File doesn't exist
          break;
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect the server response
          break;
      }
    });
  }  

