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
<<<<<<< Updated upstream
<<<<<<< HEAD
const bookedseat = require("./routes/bookedseat");
const seat = require("./routes/seat");
const movieschedule = require("./routes/movieschedule");
const auth = require("./routes/auth");
=======
const movie = require("./routes/movie")
const review = require("./routes/review")
const screen = require("./routes/screen")
>>>>>>> e4d06f0c24ffe73ab028ad592b1d209c35e0c838
=======


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
app.use("/api/v1/bookedseats", bookedseat);
app.use("/api/v1/seats", seat);
app.use("/api/v1/movieschedule", movieschedule);
<<<<<<< Updated upstream
<<<<<<< HEAD
app.use("/api/v1/auth/", auth);
=======
app.use("/api/v1/movies", movie)
app.use("/api/v1/review", review)
app.use("/api/v1/screen", screen)
>>>>>>> e4d06f0c24ffe73ab028ad592b1d209c35e0c838
=======
>>>>>>> Stashed changes

app.get("/", (req, res) => {
  res.json({
    msg: "Api is running",
  });
});

app.listen(PORT);
console.log("App runnning on port:" + PORT);
