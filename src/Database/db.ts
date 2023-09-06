import { MongooseError } from "mongoose"
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose');



    (async () => {
        const options ={
          useNewUrlParser:true,
          useUnifiedTopology:true
        }
    
          try{
              await mongoose.connect(`${process.env.MONGODB_URL }`, options )
              console.log("Database Connected!")
          }catch(e: MongooseError | any){
                
                console.log(`mongo connect error, info:${e.message} stack:${e.stack} `)
            //    throw new Error(e.message)
          }//finally{  
    })()
   
