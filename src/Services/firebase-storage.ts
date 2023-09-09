import { File } from "buffer";
import { BufferSource } from "stream/web";

const {  getDownloadURL , getSignedUrl } = require('firebase-admin/storage');

const bucket = require('../Config/firebase-admin');
async function uploadFile(fileName: string, mimetype: string, buffer: BufferSource) {
      return new Promise( async ( resolve , reject ) => {
             try{
                  let fileUpload = bucket.file(fileName);
                  const blobStream = fileUpload.createWriteStream({
                    metadata: {
                      contentType: mimetype
                    }
                   
                  });
                  blobStream.on('error', (error : any) => {
                    reject('Something is wrong! Unable to upload at the moment.');
                  });
              
                  blobStream.on('finish', () => {
                    // The public URL can be used to directly access the file via HTTP.
                    
                    resolve(true);
                  });
              
                  blobStream.end(buffer);
                  
             }catch(e){
                 reject(e)
             }
      })
    
}

async function getDownloadLink(filename: string) {
      const fileRef = bucket.file(filename);
      return await getDownloadURL(fileRef);
}
async function getFileUrl(filename: string) {
    const fileRef = bucket.file(filename);
    return await fileRef.getSignedUrl({
         action:'read',
         expires: '2050-12-31'
    })
}

module.exports = {
    uploadFile,
    getFileUrl,
    getDownloadLink
}