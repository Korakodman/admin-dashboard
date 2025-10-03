import mongoose from "mongoose";

const dburl = process.env.NEXT_PUBLIC_API_URL;

let isConnented = false;

if (!dburl) {
  throw new Error("please insert your mongodb url");
}


export async function connectToDatabase(url) {
  if(isConnented) return
  
  if(!url)throw new Error("MongoDB URL is Missing")


  try {
    await mongoose.connect(url,{
      bufferCommands: false,
    })
    isConnented = true
    console.log("MongoDB Connented")
  } catch (error) {
    console.log("MongoDB Connenting Erorr",error)
    throw error
  }
}
