require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({dest: './uploads/'});

// Allow cross origin access for remote testing
app.use(cors({ optionsSuccessStatus: 200 }));

app.use("/", express.static(__dirname));
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  let resObj = {
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  }

  res.json(resObj);
});


// listen for requests :)
const port = process.env.PORT || 3000;

 app.listen(port, function() {
  console.log(`Your app is listening on port ${port} ...`);
});