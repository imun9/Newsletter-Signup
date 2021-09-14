const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const eMail = req.body.emailAd;

  const data = {
    members: [{


      email_address: eMail,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
      }
    }]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/304949899bd";
  const options={
    method:"POST",
    auth:"AmnahtheOne:1493634f9aa22cb0bd9432b1e6f5a61b-us5"
  }

  const request = https.request(url,options,function(response){

    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else {
      res.sendFile(__dirname+"/failuare.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });

  });
  request.write(jsonData);
  request.end();

});

app.post("/failuare",function(req,res){
  res.redirect("/");

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running rn on Port 3000");
});


//api key
// 1493634f9aa22cb0bd9432b1e6f5a61b-us5

// Audince ID
// 304949899b
