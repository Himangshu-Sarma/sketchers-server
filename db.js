const mongoose = require("mongoose");

const mongoURL = 'mongodb+srv://HimangshuSarma:123Himu@cluster0.idlofyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectToMongo = async () => {
    try {
        console.log("Trying to connect to MongoDB");
        await mongoose.connect(mongoURL);
        console.log("Connected successfully");
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = connectToMongo;