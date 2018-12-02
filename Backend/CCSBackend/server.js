const cors = require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
var multer = require("multer");
const fetch = require("node-fetch");
const request = require("request");
app.use(bodyParser.json());
let fs = require("fs");
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

var globalStorage = '';
var error = null;

const url = "http://54.177.150.212:3001/menu";
app.get('/getalldrinks',function(req,res){
    const getData = async url => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          console.log(json);
          res.send(json)
          res.end("Success")
        } catch (error) {
          console.log(error);
        }
      };
      getData(url);
});


var storagePropFiles = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, createDirectory(Max_ID));
    },
    filename: function(req, file, callback) {
      callback(null, file.originalname);
    }
  });
  
  var rootDirectory = "Images/";
  
  var uploadPropFiles = multer({
    storage: storagePropFiles
  });
  
  function createDirectory(drinkname) {
    if (!fs.existsSync(rootDirectory)) {
      fs.mkdirSync(rootDirectory);
    }
    let directory = rootDirectory + drinkname;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    return directory;
  }
  
  app.post("/upload-files/", uploadPropFiles.any(), function(req, res, next) {
  });
  
  
  app.post("/getDrinkImg", function(req, res, next) {
    console.log("image body for selected img", req.body);
    var filter = ".png";
  
    var startPath =
      "/Users/local/Desktop/281/TeamProjectBackend/CCSBackEnd/Images/WMC"
    if (true) {
      var results = [];
      var files = fs.readdirSync(startPath);
    if(files.length) {
        files.forEach(async function(file) {
          fs.readFile(
            "/Users/local/Desktop/281/TeamProjectBackend/CCSBackEnd/Images/WMC"  +
              "/" +
              file,
            await function(err, content) {
              if (err) {
                res.writeHead(400, { "Content-type": "text/html" });
                console.log(err);
                res.end("No such image");
              } else {
                //specify the content type in the response will be an image
                let base64Image = new Buffer(content, "binary").toString(
                  "base64"
                );
                results.push(base64Image);
                if (results.length === files.length) {
                  res.status(200).send({ results });
                }
              }//else
            }//await
          );
        });
      }}});

app.listen(4004, () => {
    console.log("Listening on port 4004")
})
