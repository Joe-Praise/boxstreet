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
const bookedseat = require("./routes/bookedseat");
const seat = require("./routes/seat");
const movieschedule = require("./routes/movieschedule");
const auth = require("./routes/auth");
const movie = require("./routes/movie");
const review = require("./routes/review");
const screen = require("./routes/screen");

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
app.use("/api/v1/auth", auth);
app.use("/api/v1/movies", movie);
app.use("/api/v1/reviews", review);
app.use("/api/v1/screens", screen);

app.get("/", (req, res) => {
  res.json({
    msg: "Api is running",
  });
});

app.listen(PORT);
console.log("App runnning on port:" + PORT);
