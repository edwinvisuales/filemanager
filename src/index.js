const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
//s
//Initializations
const app = express();
// require("./database");
//Settings
//
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayaout: "main",
    //    layoutsDir: path.join(app.get('views'), 'layaouts'),
    layoutsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

// Middlewares

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "mySecretApp",
    resave: true,
    saveUninitialized: true
  })
);
// Routes
app.use(require("./routes/index"));
app.use(require("./routes/files/imagenes"));
app.use(require("./routes/files/videos"));

const { storage, upload } = require("./upload/upload");
// Static Files
app.use(express.static(path.join(__dirname, "/public")));
//Server is Listening
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
