import { MongoClient } from "mongodb";
const MONGO_URL= process.env.MONGO_URL;
let client= null;

export async function connectToDatabase(){
    if(client){
        return client;
    }

    if(!MONGO_URL){
        console.log("MongoDB_URL Not Found");
    }

    try {
        client = MongoClient.connect(MONGO_URL);
        console.log("Connected To Mongodb");
        return client;
    } catch (error) {
        console.log("Error Connecting To Database", error);
    }
}