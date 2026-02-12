const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB connect succesfully");
    } catch (error){
        console.error("mongoDB connection failed", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;