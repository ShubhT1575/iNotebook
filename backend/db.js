const mongoose = require('mongoose');
// const { MongoClient, ServerApiVersion } = require('mongodb');


const mongoURI = "mongodb+srv://st9889394838:bTdzxJ1bsYJRyCaD@inotebook.grrntkz.mongodb.net/?retryWrites=true&w=majority&appName=iNotebook"

const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDb sucessfully!!");
}

module.exports = connectToMongo;