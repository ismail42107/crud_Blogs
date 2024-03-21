const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect("mongodb+srv://mian42107:c9OYYfHn2DTNBVmu@cluster0.prhbm1x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
        console.log("Connected to MongoDB");
    }).catch((e) => {
        console.log(" ERROR!");
        console.log(e);
    })
}
// c9OYYfHn2DTNBVmu
// mian42107
module.exports = connectDatabase;