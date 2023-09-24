let mongoose = require("mongoose");
let express = require("express");
let app = express();
require('dotenv').config()

let cinema = require("./routes/cinema");

let PORT = process.env.PORT;
let MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true});

mongoose.connection.on('open',()=>console.log("Mongo Server connected"));
mongoose.connection.on('error',(err)=>console.log(err.message));

app.use("/api/v1/", cinema);

app.listen(PORT);
console.log("App runnning on port:"+PORT)