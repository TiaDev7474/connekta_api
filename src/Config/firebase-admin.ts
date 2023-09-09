
const { initializeApp , cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

//initialize the app

if (process.env.NODE_ENV === "production") {
    //do something in production
    initializeApp({
        credential: cert(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`),
        storageBucket:`${process.env.BUCKET_FOLDER_PATH}`
    })
  }
  
  if (process.env.NODE_ENV == "development") {
     //do something in development
     initializeApp({
        credential: cert(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`),
        storageBucket:`${process.env.BUCKET_FOLDER_PATH}`
    })
  }
const bucketStorage =  getStorage().bucket();

module.exports = bucketStorage;