const mongoose=require("mongoose");

mongoose
.connect(process.env.MONGO)
.then(() => { console.log("MongoDb Connected")})
.catch((er) => { console.log(er)});

module.exports=mongoose;