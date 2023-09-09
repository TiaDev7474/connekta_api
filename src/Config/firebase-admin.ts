const { initializeApp , cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

//initialize the app
initializeApp({
    credential: cert(JSON.parse(`${process.env.GOOGLE_APPLICATION_CREDENTIALS}`)),
    storageBucket:`${process.env.BUCKET_FOLDER_PATH}`
})
const bucketStorage =  getStorage().bucket();

module.exports = bucketStorage;