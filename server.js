const mongoose = require("mongoose");
let express = require("express");
let app = express();
require("dotenv").config();

let cinema = require("./routes/cinema");
const user = require("./routes/user");
const branch = require("./routes/branch");
const theater = require("./routes/theater");
const verification = require("./routes/verification");
const websettings = require("./routes/websettings");

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

app.use("/api/v1/cinemas", cinema);
app.use("/api/v1/users", user);
app.use("/api/v1/branches", branch);
app.use("/api/v1/theaters", theater);
app.use("/api/v1/verifications", verification);
app.use("/api/v1/websettings", websettings);


app.get("/", (req, res) => {
  res.json({
    msg: "Api is running",
  });
});

app.listen(PORT);
console.log("App runnning on port:" + PORT);