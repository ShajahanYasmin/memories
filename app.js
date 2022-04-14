const path = require("path");

const rootDir = require("./util/path");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const db = require("./util/database");
const cors = require("cors");
const flash = require("connect-flash");
const errorController = require("./controllers/error");

const app = express();
// const db = require("./util/database");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  )
    cb(null, true);
  else cb(null, false);
};

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  multer({
    dest: "images",
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);
// app.use(cors);
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const session = require("express-session");
const mySqlStore = require("express-mysql-session")(session);

const sessionStore = new mySqlStore(
  {
    createDatabaseTable: true,
    schema: {
      tableName: "sessiontb1",
      columnNames: {
        session_id: "session_id",
        data: "data",
      },
    },
  },
  db
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));
app.use("/admin", express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

app.listen(3000);
