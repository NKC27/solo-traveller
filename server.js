const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
// const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const hbs = exphbs.create({ helpers });
// const hbs = exphbs.create({ helpers });
const { uploadFile, getFileStream } = require("./s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);
const multer = require("multer");
const { Trip } = require("./models");
const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2000000 },
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// }).single("myImage");

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2000000 },
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb);
//   },
// });

function checkFileType(file, cb) {
  const fileTypes = /jpeg|jpg|png/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error");
  }
}

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/trip/image", (req, res) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        console.log("ERROR");
      } else {
        console.log("OK");
        console.log(req.file);
        res.status(200);
      }
    });
  } catch (error) {
    res.status(500);
  }
});

app.get("/uploads/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

app.post("/images/:id", upload.single("myImage"), async (req, res) => {
  const file = req.file;
  console.log(file);

  const result = await uploadFile(file);
  // delete file from server once uploaded to s3
  await unlinkFile(file.path);
  console.log(result);
  // const description = req.body.description;
  Trip;
  await Trip.update(
    { img_src: `/uploads/${result.Key}` },
    { where: { id: req.params.id } }
  );
  res.status(200).render("companyDashboard");
  // res.send({ imagePath: `/uploads/${result.Key}` });
});

app.get("*", function (req, res) {
  res.redirect("/");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

// app.listen(PORT, () => console.log("Now listening"));
