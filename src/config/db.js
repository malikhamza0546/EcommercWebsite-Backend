const mongoose = require("mongoose");
const bodyParser = require("body-parser");

 const connectDb=()=>{
    return mongoose
    .connect(
      "mongodb+srv://Adi:Adnan123@atlascluster.vvo59t9.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster"
    )
    .then((res) => {
      console.log("Connected to DataBase");
    })
    .catch((err) => {
      console.log("err");
    });
}

module.exports={connectDb}
