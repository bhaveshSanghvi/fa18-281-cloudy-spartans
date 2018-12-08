const cors = require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var axios = require('axios');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
var multer = require("multer");
const fetch = require("node-fetch");
const request = require("request");
app.use(bodyParser.json());
let fs = require("fs");
var axios = require("axios")
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
  var requestp = require('request-promise');

var globalStorage = '';
var error = null;
var FolderName = "";
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

app.get('/order/:orderid',function(req,res){
  const orderid = req.params.orderid;
  const url11 = "http://18.144.63.198:3001/order/"+orderid;
  console.log("url is ",url11)

  axios.get(url11).then(response=>
      {
          console.log("response is ", response.data)
          res.status(200).send(response.data);
      })
    })


const url_2 = "http://54.177.150.212:3001/addadrink";

app.post('/addadrink',function(req,res){
   console.log("REQ BODY IS", req.body) 
   fetch(url_2, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        credentials : 'include',
        body: JSON.stringify({
            Name: req.body.Name,
            Price: 5,
            Size: req.body.Size,
            Description: req.body.Description
    })})
    .then(response => {
      if(response.status === 400)
        {
          this.setState({errors : true})
        }
      else
        {
          res.send(200)
          res.end("Success")
        }
      })
      
});


app.post("/processOrders/:orderid",(req,res)=>{
  const orderid = req.params.orderid;

  const data = {
    name : req.body.name,
    userAmount: req.body.price
  }
  axios.post("http://18.144.63.198:3001/orders",data).then((response)=>{

    res.sendStatus(200)

  }).catch((error)=>{
      res.status(201).json({
        erorr : "We could not process orders"
      });
  })


})



const url_3 = "http://54.177.74.65:3000/signup";
app.post('/signup',function(req,res){
  console.log("REQ BOIDY", req.body)
  fetch(url_3, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    credentials : 'include',
    body: JSON.stringify({
      Userid: req.body.firstname,
      UserType: req.body.usertype,
      Password: req.body.password,
      email : req.body.email
})})
.then(response => {
  if(response.status === 400)
    {
      this.setState({errors : true})
    }
  else
    {
      res.send("Success")
      res.end("Success")
    }
  })
});


const url_4 = "http://52.8.43.95:3000/cart";
app.post('/addtocart',function(req,res){
  console.log("REQ BOIDY", req.body)
  console.log("url is ",url_4)
  // axios.post(url_4,
  // {
  //   userid : req.body.userid,
  //         productid : req.body.product,
  //         cartItems : {
  //             name: req.body.name,
  //             price : req.body.price,
  //             size: req.body.size,
  //             count : 1
  //   }
  // }).then(response=>
  //     {
  //         console.log("response is ", response.data)
  //         res.status(200).send(response.data);
  //     })

  fetch(url_4, {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    credentials : 'include',
    body: JSON.stringify({
      userid : req.body.userid,
      cartItems : {
         productid: req.body.cartItems.productid,
          name: req.body.cartItems.name,
          price : req.body.cartItems.price,
          size: req.body.cartItems.size,
          count : 1
      }
    })})
.then(response => {
  if(response.status === 400)
    {
      this.setState({errors : true})
    }
  else
    {
      response.json()
      .then(user => {
        console.log("NAME" + JSON.stringify(user))
        res.send(user)
        res.end("Success")
        })
    }
  })
});


const url_6 = "http://52.8.43.95:3000/cart";
app.put('/addtocart',function(req,res){
  console.log("REQ BODY", req.body)
  fetch(url_6, {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    credentials : 'include',
    body: JSON.stringify({
      userid : req.body.userid,
      cartItems : {
         productid: req.body.cartItems.productid,
          name: req.body.cartItems.name,
          price : req.body.cartItems.price,
          size: req.body.cartItems.size,
          count : 1
      }
    })})
.then(response => {
  if(response.status === 400)
    {
      this.setState({errors : true})
    }
  else
    {
      response.json()
      .then(user => {
        console.log("NAME" + JSON.stringify(user))
        res.send(user)
        res.end("Success")
        })
    }
  })
});


const url_7 = "http://52.8.43.95:3000/checkout";
app.get('/checkout',function(req,res){
  console.log("REQ BODY", req.body)
  fetch(url_7, {
    method: 'get',
    credentials : 'include'
  })
.then(response => {
  if(response.status === 400)
    {
      this.setState({errors : true})
    }
  else
    {
      console.log(response)
      res.send("Success")
      res.end("Success")
    }
  })
});







app.post('/addfolder',function(req,res){
  console.log("REQ BODY IS", req.body)
  FolderName = req.body.FolderName
  res.end("Folder Created")
});

var Folder = "";
var storagePropFiles = multer.diskStorage({
  destination: function(req, file, callback) {
  console.log("FOLDER NAME IS ", FolderName);
    callback(null, createDirectory(FolderName));
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

var rootDirectory = "Images/";

var uploadPropFiles = multer({
  storage: storagePropFiles
});

function createDirectory(FolderName) {
  if (!fs.existsSync(rootDirectory)) {
    fs.mkdirSync(rootDirectory);
  }
  let directory = rootDirectory + FolderName;
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  return directory;
}

app.post("/upload-files/", uploadPropFiles.any(), function(req, res, next) {
});


  var rootDirectory = "Images/";

  
  app.post("/getDrinkImg", function(req, res, next) {
    console.log("image body for selected img", req.body);
    var filter = ".png";
  
    var startPath =
      "/Users/local/Desktop/281/TeamProjectBackend/CCSBackEnd/Images/" + req.body.id
    if (true) {
      var results = [];
      var files = fs.readdirSync(startPath);
    if(files.length) {
        files.forEach(async function(file) {
          fs.readFile(
            "/Users/local/Desktop/281/TeamProjectBackend/CCSBackEnd/Images/"  + req.body.id + 
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



app.post('/amount',function(req,res){
  console.log("REQ BODY", req.body);
  console.log(req.body.name,req.body.count);

  const data ={
    name : req.body.name,
    count : req.body.count 
  }

  axios.post("http://18.144.63.198:3001/amount",data).then((response)=>{
    console.log(response.status);
    console.log(response.data);
    res.status(200).json(response.data);
  }).catch((error)=>{
    console.log("inside error");
    console.log(error);
    res.status(201).json({
      error
    })
  })


  /*
  axios.post("http://13.56.16.252:3001/amount",data).then((response)=>{
    console.log("inside response");
    console.log(response.status);
    console.log(response.data);
    res.sendStatus(200);
  }).catch((error)=>{
   console.log("inside catch error");
   console.log(error);
   res.sendStatus(201);
  });
  */
 /*
fetch("http://13.57.50.197:3001/amount", {
    method: 'POST',
    json: true,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
            name : req.body.name,
            count : req.body.count        
})
})
.then((response) => {
  console.log(response)
  if(response.status === 400)
    {
      console.log("err");
      res.send("err");
    }
  else
    {
      console.log("successs");
      console.log(response);
      res.send("Success")
      res.end("Success")
    }
  })  

  */
});

app.get('/cart/:id',function(req,res){
  const url5="http://52.8.43.95:3000/cart/"+ req.params.id;
  console.log("url is ",url5)
  console.log("userid", req.params.id);

  axios.get(url5).then(response=>
      {
          console.log("response is ", response.data)
          res.status(200).send(response.data);
      })
      
    })
  


app.listen(4004, () => {
    console.log("Listening on port 4004")
})
