require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const rsvpRoutes = require("./routes/rsvpRoutes");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const connectDB = require("./db/connect");

const flash = require("connect-flash");

const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.json());

app.use(flash());
app.use("/api/rsvp", rsvpRoutes);

app.get("/", (req, res) => {
  res.render("dashboard");
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);

    app.listen(port, function () {
      console.log(`Express server listening on port ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
