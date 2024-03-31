const mongoose = require('mongoose');


const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&directConnection=true&tls=false"

const connectToMongo = async ()=>{
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDb sucessfully!!");
}

module.exports = connectToMongo;