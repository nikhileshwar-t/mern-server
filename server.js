const express = require("express"),
  http = require("http");

require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/key");

const Image = require("./models/file");

const multer = require("multer");
const path = require("path");
const UPLOAD_PATH = path.resolve(__dirname, "path/to/uploadedFiles");
const fileRoutes = require('./routes/file-upload-routes');
const upload = multer({
  dest: UPLOAD_PATH,
  limits: { fileSize: 1000000, files: 5 },
});

const app = express();

//============= MONGOOSE SETTING ==============//
mongoose
  .connect(process.env.MONGODB_URI || MONGO_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Mondodb Connected ...."))
  .catch((err) => console.error(err));
//---------model--------//
require("./models/usermodel");

//==========ROUTING========//
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

app.all("/", (req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  next();
});

app.use(cors());

const usersRouter = require("./routes/authroute");

const adminsRouter = require("./routes/admins");
const organizationsRouter = require("./routes/organizations");
const rolesRouter = require("./routes/roles");

app.use("/users", usersRouter);
app.use("/admins", adminsRouter);
app.use("/organizations", organizationsRouter);
app.use("/roles", rolesRouter);

app.use("/auth", require("./routes/authroute"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", fileRoutes.routes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static('client/build/index.html'));
}
//===========PORT SETTING============//

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port port ${port}`));
