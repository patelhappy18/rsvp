require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
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
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL, // from MongoDB Atlas or local Mongo
      collectionName: "sessions",
    }),
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);
app.use("/api/rsvp", rsvpRoutes);

app.get("/", (req, res) => {
  const { msg } = req.query;
  res.render("dashboard", { msg });
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
