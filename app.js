const path = require("path");

const rootDir = require("./util/path");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./util/database");
const cors = require("cors");

const errorController = require("./controllers/error");

const app = express();
// const db = require("./util/database");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(cors);
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
