import mongoose from "mongoose"

const uri: any = process.env.MONGO_URL

console.log(uri);

export async function connectionToDatabase(){
    try{

        await mongoose.connect(uri);
          console.log("MongoDB connected");

    }catch(e){
        console.error("Mongodb is not getting connected",  e);

        throw new Error("Mongodb is not getting connected")
        
    }
}
