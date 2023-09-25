let mongoose = require("mongoose");
let express = require("express");
let app = express();
require("dotenv").config();

let cinema = require("./routes/cinema");

let PORT = process.env.PORT;
let MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", () => console.log("Mongo Server connected"));
mongoose.connection.on("error", (err) => console.log(err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/", cinema);
app.get("/",(req,res)=>{
    res.json({
        msg:"Api is running"
    })
})

app.listen(PORT);
console.log("App runnning on port:" + PORT);
